const { isMainThread, parentPort, workerData } = require('worker_threads');
const { serviceMap } = require('../services/register');
const { debugFormatData, requestor } = require('../services/requestor');
const { performance } = require('perf_hooks');
const nodeUrl = require("url");
const process = require('process');

// Setup Run
const Run = require('run-sdk')
const RunHelper = require('../nft/runHelper');

const runHelper = new RunHelper(workerData.mnemonic, workerData.network);
const run = runHelper.initialize();

if (!isMainThread) {
    parentPort.on("message", async (event) => {
        const collection = await createNftCollection(
            event.jigClassLocation,
            event.request.body.name,
            event.request.body.supply,
            event.request.body.staticImageTxId,
            event.request.body.animationImageTxId)
        
        createNft(event.request.body.supply, collection, event.owner, event.request);
    });
}

const createNftCollection = async (jigClassLocation, name, supply, staticImageTxId, animationImageTxId) => {
    run.timeout = 300000;
    const NftCollection = await run.load(jigClassLocation);
    await NftCollection.sync();

    let collection = new NftCollection(name, supply, staticImageTxId, animationImageTxId);
    await collection.sync();
    return collection;
}

const createNft = async (amount, collection, to, request) => {
    try {
        const t0 = performance.now();
        let cloneRequest = JSON.parse(JSON.stringify(request));
        cloneRequest.body = {};

        const { data, hasError } = await callBackendApi("GET", "relic", "/user-id", cloneRequest);

        if (hasError) {
            return { status: 500, data: { error: "Error during call prepare nft api" } };
        }

        var nftList = []
        for (let i = 1; i <= amount; i++) {
            try {
                const nft = collection.mint(to, data.userId);
                if (!nft) {
                    return { status: 500, data: { error: 'Error when create blockchain transaction' } };
                }

                await nft.sync();
                
                const systemsNft = {
                    userId: data.userId,
                    currentLocation: nft.location,
                    collectionIndex: nft.index,
                    note: request.body.note
                }

                nftList = [...nftList, systemsNft]

                console.log('create nft successfully', nft.location);
            } catch (ex) {
                console.log('Error: ', ex);
                throw ex;
            }
        }

        request.body = {
            ...request.body,
            originLocation: collection.origin,
            total: collection.maxNfts,
            title: collection.name,
            nfts: nftList
        }
    
        await createCollection(request);

        const t1 = performance.now()
        console.log("Create NFT(s) took " + (t1 - t0) + " milliseconds.");

        process.exit(1);
    } catch (ex) {
        console.error("Error: ", ex);
        process.exit(2);
    }
}


const createCollection = async (request) => {
    const { data, hasError } = await callBackendApi("POST", "relic", "/create-collection", request);
    if (!data || hasError) {
        request.log.error({
            message: "updateNFT: error when call backend api"
        });

        return { status: 500, data: { message: "updateNFT: error when call backend api" } };
    }

    return data;
}

async function callBackendApi(method, service, path, request) {
    const serviceUrl = serviceMap.get(service);
    const requestPath = new nodeUrl.URL(serviceUrl + path);
    let url = requestPath.toString();
    if (request.params) {
        url = url + '?';
        const paramKeys = Object.keys(request.params);
        if (paramKeys.length > 0) {
            paramKeys.forEach((key) => {
                url += `${key}=${request.params[key]}&`;
            });
        }
        url = url.slice(0, -1);
    }

    let response;
    let customHeaders = {
        host: requestPath.hostname,
    };
    let data = request.body;
    let headers = { ...request.headers, ...customHeaders };
    response = await requestor.request({
        url,
        method,
        headers,
        params: request.query,
        data: data && JSON.stringify(data),
    });

    if (process.env.NODE_ENV !== "production") {
        if (response.hasError) {
            console.error("====== REQUEST ERROR ======");
            console.warn("URL string is ", url, " status code is ", response.status,
                " Bearer token is ", { ...headers }["authorization"],
                " params are ", JSON.stringify(request.query), " POST data is ", data && JSON.stringify(data));
        } else {
            console.log("Success: ", url, "data:");
            console.log(debugFormatData(response.data));
        }
    } else {
        if (response.hasError) {
            console.error({
                url,
                response: response.data,
                status: response.status,
                error: response.errors,
            });
        }
    }

    return response;
}

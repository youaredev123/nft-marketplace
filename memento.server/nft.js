const RunHelper = require('./nft/runHelper');
const { serviceMap } = require('./services/register');
const { debugFormatData, requestor } = require('./services/requestor');
const nodeUrl = require("url");
const { request } = require('http');

const bsv = require('bsv');
const bitcoinfiles = require('bitcoinfiles-sdk');
const Script = require('bsv').Script;
const path = require('path');
const { Worker } = require("worker_threads");

const network = "test";

const supportedTypes = ['png', 'glb', 'jpg', 'jpeg'];

function createHandler(fastify, method, service, path, handler) {
  fastify.route({
    schema: {
      tags: [service],
    },
    method,
    url: `/api${path}`,
    handler: async (request, reply) => {
      const response = await handler(request);
      reply.status(response.status).send(response.data);
    },
  });
}

async function callBackendApi(method, service, path, request) {
  const serviceUrl = serviceMap.get(service);
  const requestPath = new nodeUrl.URL(serviceUrl + path);
  let url = requestPath.toString();
  const paramKeys = Object.keys(request.params);

  if (paramKeys.length > 0) {
    paramKeys.forEach((key) => {
      url = url.replace(`:${key}`, encodeURIComponent(request.params[key]));
    });
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

function getRunHelper(mnemonic, networkParam = network) {
  const runHelper = new RunHelper(mnemonic, networkParam);
  const run = runHelper.initialize();
  return { runHelper, run };
}

const getWalletInfo = async (request) => {
  const walletResponse = await callBackendApi("GET", "user", "/wallet/relica", request);
  return walletResponse.data;
}

// Obsolete
const createNFTCollection = async (request) => {
  if (!request.body) {
    return { status: 500, data: { error: "Request body is empty!" } };
  }

  //TODO validate only admin can create NFT
  const { mnemonic } = await getWalletInfo(request);

  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const runHelper = new RunHelper(mnemonic, network);
  const location = process.env.JIG_CLASS_NFTCOLLECTION_LOCATION;

  runHelper.initialize();
  const { name, supply, staticImageTxId, animationImageTxId } = request.body;
  const nftCollection = await runHelper.createNftCollection(location, name, supply, staticImageTxId, animationImageTxId);

  return { status: 200, data: nftCollection };
}

const getNFTCollections = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const { data, hasError } = await callBackendApi("GET", "relic", "/collections", request);
  if (hasError) {
    return { status: 500, data: { error: "Error during call prepare nft api" } };
  }

  return { status: 200, data: data };
}

// Obsolete
const createNFT = async (request) => {
  //TODO validate only admin can create NFT
  const { mnemonic, currentJigChildAddress } = await getWalletInfo(request);

  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }
  const { data, hasError } = await callBackendApi("GET", "relic", "/user-id", request);
  if (hasError) {
    return { status: 500, data: { error: "Error during call prepare nft api" } };
  }

  const { runHelper } = getRunHelper(mnemonic);
  const nft = await runHelper.createSingleNft(request.query.class, data, currentJigChildAddress);
  if (!nft) {
    request.log.error({
      message: "createNft: error when create blockchain transaction"
    });
    return { status: 500, data: { error: 'Error when create blockchain transaction' } };
  }

  request.body = {
    ...request.body,
    rarity: `${nft.index}/${nft.nftCollection.maxNfts}`,
    type: nft.nftCollection.name
}

  await updateNFT(request, nft);

  return { status: 200, data: nft };
}

const updateNFT = async (request, nft = null) => {
  if (nft) {
    request.body = {
      ...request.body,
      ...{
        nftId: nft.nftId,
        userId: nft.userId,
        currentLocation: nft.location,
      }
    };
  }
  const { data, hasError } = await callBackendApi("PUT", "relic", "/update-nft", request);
  if (!data || hasError) {
    request.log.error({
      message: "updateNFT: error when call backend api"
    });
    return null;
  }

  return data;
}

/**
 * Create order
 * @param {*} request
 * @returns
 */
const sellNFT = async (request) => {
  const { mnemonic, currentJigChildAddress } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const { satoshis, nftId } = request.body;
  const existingNft = await getNFTFromBackend(nftId, request);

  if (!existingNft) {
    return { status: 402, data: { error: "NFT not found" } };
  }

  //TODO validate satoshis
  const { runHelper } = getRunHelper(mnemonic);
  const { status, nft } = await runHelper.sell(existingNft.location, satoshis);

  if (status) {
    request.body = {
      ...request.body,
      ...{
        nftLocation: nft.location,
        mapDrop: false
      }
    };

    const { data, hasError } = await callBackendApi("POST", "relic", "/create-order", request);
    if (!data || hasError) {
      request.log.error({ message: "sellNFT: error when call backend api" });
      return { status: 500, data: { error: 'Error when call backend api' } };
    }

    return { status: 200, data: nft };
  } else {
    request.log.error({ message: "sellNFT: error when create blockchain transaction" });
  }

  return { status: 500, data: { error: 'Error when create blockchain transaction' } };
}

/**
 * Get NFT from backoffice
 * @param {*} nftId
 * @param {*} request
 * @returns
 */
const getNFTFromBackend = async (nftId, request) => {
  const { data, hasError } = await callBackendApi("GET", "relic", `/nft/${nftId}`, request);
  if (!data || hasError) {
    request.log.error({
      message: "Cannot find NFT",
      nftId
    });

    return null;
  }
  return data;
}

/**
 * Get NFT from backend and sync with blockchain
 * @param {*} request
 * @returns
 */
const getNFT = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }
  const { data, hasError } = await callBackendApi("GET", "relic", "/nft/:nftId", request);

  if (!data || !data.location || hasError) {
    request.log.error({
      message: "getNFT: error when call backend api",
      response: data
    });

    return { hasError, status: 500, data: { error: 'getNFT: Error when call backend api', response: data } };
  }

  return { status: 200, data: data };
}


/**
 * Fill order
 * @param {*} request
 * @returns
 */
const buyNFT = async (request) => {
  const { mnemonic, currentJigChildAddress } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const { runHelper } = getRunHelper(mnemonic);
  const order = await callBackendApi("GET", "relic", `/order/${request.body.orderId}`, request);
  if (!order.data) {
    return { status: 422, data: { error: "Order does not exist" } };
  }

  const existingNft = await getNFTFromBackend(order.data.nftId, request);
  if (!existingNft) {
    return { status: 402, data: { error: "NFT not found" } };
  }
  
  const { status, nft } = await runHelper.buy(existingNft.location, request.body.cancel, 0);
  if (status) {
    request.body = { ...request.body, ...{ nftLocation: nft.location } }
    const { data, hasError } = await callBackendApi("PUT", "relic", `/fill-order`, request);

    if (!data || hasError) {
      request.log.error({
        message: "buyNFT: error when call backend api",
        orderId: request.body.orderId,
        currentJigChildAddress: process.env.JIG_CLASS_NFTCOLLECTION_LOCATION
      });
      return { status: 500, data: { error: 'buyNFT: Error when call backend api' } };
    }
    return { status: 200, data: nft };

  } else {
    request.log.error({
      message: "sellNFT: error when create blockchain transaction",
      orderId: request.body.orderId,
      currentJigChildAddress: process.env.JIG_CLASS_NFTCOLLECTION_LOCATION
    });
  }
  return { status: 500, data: { error: 'buyNFT: Error when create blockchain transaction' } };
}

const getOrders = async (request) => {
  return await callBackendApi("GET", "relic", "/orders/open", request);
}

// Obsolete
const getNFTs = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const satchel = await callBackendApi("GET", "relic", `/nft/mine`, request);

  return { status: 200, data: satchel };
}

const getWalletForUploading = async () => {
  // We must use mainnet to upload file/image to blockchain
  // Hardcode for testing purpose

  return {
    mnemonic: 'anchor fury ghost process impose include supreme bridge spice pen heart flat',
    privateKey: 'KwvWeBRiY4YzBGMkG8VwMg54767LyymsZgXq2snYAdD74wkirhhR',
    currentBsvChildAddress: '1CdNf2ma9nTJ48fWtn7ASwjz1te6FQSid6'
  };
}

const uploadImage = async (request) => {
  // TODO: Remove 'undefined' in the future
  let walletInfo;
  if (process.env.NETWORK === 'test' || undefined) {
    walletInfo = await getWalletForUploading();
  } else {
    walletInfo = await getWalletInfo(request);
  }

  const { run } = getRunHelper(walletInfo.mnemonic, 'main');

  const imageTxIds = {
    animatedImageTxId: '',
    staticImageTxId: ''
  };

  for (let i = 0; i < request.body.image.length; i++) {
    const fileExtension = request.body.image[i].filename.split('.')[1];
    const isValid = supportedTypes.includes(fileExtension) &&
      request.body.image[i].filename.split('.').length == 2;
    if (!isValid) {
      // return { status: 500, data: { message: 'Unsupported file type.' } };
      return { error: 'Unsupported file type.' };
    }

    const fileType = request.body.image[i]
      && request.body.image[i].mimetype == 'application/octet-stream' ?
      'model/gltf-binary' : request.body.image[i].mimetype;

    const isAnimatedImage = fileType == 'model/gltf-binary';
    const queueRequest = {
      file: {
        content: request.body.image[i].data.toString('base64'),
        mimetype: fileType,
        contentType: fileType,
        encoding: 'base64', // 'hex', 'utf8', 'base64'
        name: request.body.image[i].filename,
      }
      //, session_tag: 'a-random-uuid-you-can-use-as-a-folder'
    };

    const result = await bitcoinfiles.queueFile(queueRequest);

    const amount = result.message.payment_sats_needed;
    const paymentAddress = result.message.payment_address;

    try {
      const script = Script.fromAddress(walletInfo.currentBsvChildAddress).toHex();
      const utxos = await run.blockchain.utxos(script);
      const tx = new bsv.Transaction().from(utxos)
        .to(paymentAddress, amount)
        .change(walletInfo.currentBsvChildAddress)
        .sign(run.purse.privkey);

      const rawtx = tx.toString();
      try {
        const transactionId = await bitcoinfiles.payQueuedFiles(rawtx);
        if (isAnimatedImage) {
          imageTxIds.animatedImageTxId = transactionId[0];
        } else {
          imageTxIds.staticImageTxId = transactionId[0];
        }
      } catch (ex) {
        return { error: ex }
      }

    } catch (ex) {
      return { error: ex }
    }
  }

  return { imageTxIds };
}

const getNFTsByCollection = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const { data, hasError } = await callBackendApi("GET", "relic", "/collection/:collectionId", request);

  if (!data || hasError) {
    request.log.error({
      message: "Get NFT by collection: error when call backend api",
      response: data
    });

    return { hasError, status: 500, data: { error: 'Get NFT by collection: Error when call backend api', response: data } };
  }

  return { status: 200, data: data };
}

const bulkCreateNFT = async (request) => {
  const { imageTxIds, error } = await uploadImage(request);

  if (error) {
    return { status: 500, data: { error: error } };
  }

  let contentTypeHeader = request.headers['content-type'].split(';');
  contentTypeHeader[0] = 'application/json';
  request.headers['content-type'] = contentTypeHeader.join(';');
  
  request.body = {
    name: request.body.name,
    supply: +request.body.supply,
    note: request.body.note ? request.body.note : '',
    staticImageLocation: imageTxIds.staticImageTxId,
    animatedImageLocation: imageTxIds.animatedImageTxId
  };

  const { mnemonic, currentJigChildAddress } = await getWalletInfo(request);

  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }
  
  const workerDir = path.join(__dirname, 'workers/nft-worker.js');
  const message = {
    request: {
      headers: request.headers,
      params: request.query,
      body: request.body
    },
    owner: currentJigChildAddress,
    jigClassLocation: process.env.JIG_CLASS_NFTCOLLECTION_LOCATION
  };

  const worker = new Worker(workerDir, {
    workerData: {
      mnemonic: mnemonic,
      network: network
    }
  });

  worker.once("message", result => {
    console.log('Proceeded message', result);
  });

  worker.on("error", error => {
    console.log(error);
  });

  worker.on("exit", exitCode => {
    console.log("Exit with code: ", exitCode);
  });

  console.log("Executed in the parent thread");

  worker.postMessage(message);

  return { status: 200, data: { message: 'Nfts are creating in background, it might take some time.'} };
}

const deploySmartContract = async (request) => {
  const mnemonic = 'dizzy fiscal fossil comfort hour attitude actress current obvious polar spring dress';
  const { runHelper } = getRunHelper(mnemonic);
  const result = await runHelper.deploy();
  return { status: 200, data: result };
}

const upgradeSmartContract = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const { runHelper } = getRunHelper(mnemonic);
  const result = await runHelper.upgrade(process.env.JIG_CLASS_NFTCOLLECTION_LOCATION);
  return { status: 200, data: result };
}

const getAllCollections = async (request) => {
  const { data, hasError } = await callBackendApi("GET", "relic", "/collections", request);
  return { data: data }
}

const dropNFT = async (request) => {
  const { mnemonic } = await getWalletInfo(request);
  if (!mnemonic) {
    return { status: 402, data: { error: "Invalid password" } };
  }

  const order = await callBackendApi("POST", "relic", "/create-order", request);
  if (!order.data || order.hasError) {
    request.log.error({
      message: "Drop NFT: Error occurs when try to create order"
    });

    return { status: 500, data: { error: 'Drop NFT: Error occurs when try to create order' } };
  }

  request.body = {
    nftId: order.data.nftId,
    orderId: order.data.orderId
  }

  const { data, hasError } = await callBackendApi("PUT", "relic", "/bury-nft", request);
  if (hasError) {
    request.log.error({
      message: "Drop NFT: Error occurs when try to bury nft"
    });

    return { status: 500, data: { error: 'Drop NFT: Error occurs when try to bury nft' } };
  }

  return { status: 200, data: { message: 'Bury NFT successfully!'} }; 
}

module.exports = function (fastify) {
  createHandler(fastify, "POST", "relic", "/create-nft-collection", createNFTCollection);
  createHandler(fastify, "GET", "relic", "/get-nft-collection", getNFTCollections);
  createHandler(fastify, "GET", "relic", "/prepare-nft", createNFT);
  createHandler(fastify, "POST", "relic", "/create-order", sellNFT);
  createHandler(fastify, "PUT", "relic", "/fill-order", buyNFT);
  createHandler(fastify, "GET", "relic", "/orders", getOrders);
  createHandler(fastify, "GET", "relic", "/coins", getNFTs);
  createHandler(fastify, "PUT", "relic", "/update-nft", updateNFT);
  createHandler(fastify, "GET", "relic", "/nft/:nftId", getNFT);
  createHandler(fastify, "POST", "relic", "/upload-image", uploadImage);
  createHandler(fastify, "GET", "relic", "/collection/:collectionId", getNFTsByCollection);
  createHandler(fastify, "GET", "relic", "/collections", getAllCollections);
  createHandler(fastify, "POST", "relic", "/bulk-create-nft", bulkCreateNFT);
  createHandler(fastify, "POST", "relic", "/drop-nft", dropNFT);

  // Deploy and upgrade smart contract
  // createHandler(fastify, "POST", "relic", "/deploy-smart-contract", deploySmartContract);
  // createHandler(fastify, "PUT", "relic", "/upgrade-smart-contract", upgradeSmartContract);
}

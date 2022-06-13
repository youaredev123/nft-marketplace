const { serviceMap } = require('./register');
const { debugFormatData, requestor } = require('./requestor');
const nodeUrl = require("url");

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

module.exports =  { callBackendApi }
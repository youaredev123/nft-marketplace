const {TransactionService} = require("./services/TransactionService");

const nodeUrl = require("url");
const { PublicKey, PrivateKey, crypto } = require('bsv');
require('dotenv').config();
const { debugFormatData, requestor } = require('./services/requestor');
const { serviceMap } = require('./services/register');

async function baseHandler(method, request, service, path, callback = null) {
  const serviceUrl = serviceMap.get(service);
  const requestPath = new nodeUrl.URL(serviceUrl + path);

  let url = requestPath.toString();

  let customHeaders = {
    host: requestPath.hostname,
  };

  const paramKeys = Object.keys(request.params);
  if (paramKeys.length > 0) {
    paramKeys.forEach((key) => {
      url = url.replace(`:${key}`, encodeURIComponent(request.params[key]));
    });
  }

  let response;
  let data = request.body;

  if (callback) {
    ({data, customHeaders} = await callback(data, customHeaders));
  }

  // send request and wait for response
  response = await requestor.request({
    url,
    method,
    headers: {...request.headers, ...customHeaders},
    params: request.query,
    data: data && JSON.stringify(data),
  });

  if (process.env.NODE_ENV !== "production" && request.ip === "127.0.0.1") {
    if (response.hasError) {
      console.error("====== REQUEST ERROR ======");
      console.warn("URL string is ", url, " status code is ", response.status,
        " Bearer token is ", {...request.headers, ...customHeaders}["authorization"],
        " params are ", JSON.stringify(request.query), " POST data is ",
        data && JSON.stringify(data));
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

async function unlockRelicAndCreateTransaction(request, reply, relicPath, callback = null) {
  let backoffDelay = 1000; // 1 second
  const backoffExponent = 2;
  let retriesTime = 0;
  let response;

  while (retriesTime <= 2) {
    response = await baseHandler("GET", request, "relic", relicPath, callback);

    // Call relica /unlock backend endpoint
    if (response.status !== 200) {
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      backoffDelay *= backoffExponent;
      retriesTime++;
    } else {
      break;
    }
  }

  if (response.status !== 200 || !response.data.txId) {
    reply.status(response.status).send(response.data);

    return;
  }

  console.log("has data id: " + response.data.id)
  console.log("has data txId: " + response.data.txId)
  console.log("has data paymail: " + response.data.paymail)
  console.log("has data secret: " + response.data.secret)

  retriesTime = 0;
  const transactionService = new TransactionService();
  let transactionResult;

  while (retriesTime <= 2) {
    transactionResult = await transactionService.unlockRelic({
      relicId: response.data.id,
      txId: response.data.txId,
      paymail: response.data.paymail,
      secret: response.data.secret,
    });

    if (transactionResult === true) {
      break
    }

    await new Promise(resolve => setTimeout(resolve, backoffDelay));
    backoffDelay *= backoffExponent;
    retriesTime++;
  }

  if (transactionResult === true) {
    console.log("pass")
  } else {
    console.log("fail")
  }

  reply.status(transactionResult === true ? 200 : 500).send(response.data);
}

function createHandler(fastify, method, service, path, callback = null) {
  fastify.route({
    schema: {
      tags: [service],
    },
    method,
    url: `/api${path}`,
    handler: async (request, reply) => {
      const response = await baseHandler(method, request, service, path, callback);

      // check the status of the response
      reply.status(response.status).send(response.data);
    },
  });
}

function createHandCashHandler(fastify, method, service, path) {
  return createHandler(fastify, method, service, path, async (data, customHeaders) => {
    if (!data || !data.authToken) {
      return { data, customHeaders };
    }

    const timestamp = new Date().toISOString();
    const privateKey = PrivateKey.fromHex(data.authToken);
    const publicKey = PublicKey.fromPoint(PublicKey.fromPrivateKey(privateKey).point, true);
    const signaturePayload = "GET\n/v1/connect/profile/currentUserProfile\n" + timestamp + "\n";
    const hash = crypto.Hash.sha256(Buffer.from(signaturePayload));
    const signature = crypto.ECDSA.sign(hash, privateKey).toString();

    const { authToken, ...dataWithoutAuthToken } = data;

    return {
      data: dataWithoutAuthToken,
      customHeaders: {
        ...customHeaders,
        'oauth-publickey': publicKey.toHex(),
        'oauth-signature': signature,
        'oauth-timestamp': timestamp,
      },
    };
  });
}

function createTxIdHandler(fastify, method, service, path) {
  return createHandler(fastify, method, service, path, (data, customHeaders) => {
    return {
      data,
      customHeaders: {
        ...customHeaders,
        'service-request-key': process.env.SERVICE_REQUEST_KEY,
      },
    };
  });
}

// function createUnlockTransactionHandler(fastify, method, service, path, callback = null) {
//   fastify.route({
//     schema: {
//       tags: [service],
//     },
//     method,
//     url: `/api${path}`,
//     handler: async (request, reply) => {
//       const transactionService = new TransactionService();

//       const transactionResult = await transactionService.unlockRelic({
//         relicId: request.body.relicId,
//         txId: request.body.txId,
//         secret: request.body.secret,
//         paymail: request.body.paymail,
//       });

//       reply.status(transactionResult === true ? 200 : 500).send();
//     },
//   });
// }

function unlockAndCreateTransactionHandler(fastify, method, service, path, callback = null) {
  fastify.route({
    schema: {
      tags: [service],
    },
    method,
    url: `/api${path}`,
    handler: async (request, reply) => {
      await unlockRelicAndCreateTransaction(request, reply, '/unlock', callback);
    },
  });
}

function unlockMyRelicAndCreateTransactionHandler(fastify, method, service, path, callback = null) {
  fastify.route({
    schema: {
      tags: [service],
    },
    method,
    url: `/api${path}`,
    handler: async (request, reply) => {
      await unlockRelicAndCreateTransaction(request, reply, '/unlock-my-relic/:relicId', callback);
    },
  });
}

async function createGetWalletHandle(fastify, method, service, path) {
  return createHandler(fastify, method, service, path, async (data, customHeaders) => {
    return {
      data ,
      customHeaders: {
        ...customHeaders,
        ...{"Content-Type" : "application/json"}
      }
    }
  })
}

function createHandlerWithoutPrefix(fastify, method, service, path, callback = null) {
  fastify.route({
    schema: {
      tags: [service],
    },
    method,
    url: `${path}`,
    handler: async (request, reply) => {
      const response = await baseHandler(method, request, service, path, callback);

      // check the status of the response
      reply.status(response.status).send(response.data);
    },
  });
}

module.exports = function (fastify) {
  /* ----  USERS ---- */
  // Authentication MoneyButton
  createHandler(fastify, "POST", "user", "/create/money-button");
  createHandler(fastify, "POST", "user", "/login/money-button");
  // Authentication HandCash
  createHandCashHandler(fastify, "POST", "user", "/create/hand-cash");
  createHandCashHandler(fastify, "POST", "user", "/login/hand-cash");

  // Profile
  createHandler(fastify, "GET", "user", "/profile/user-id/:id");
  createHandler(fastify, "GET", "user", "/profile/:username");
  createHandler(fastify, "GET", "user", "/profile");
  createHandler(fastify, "GET", "user", "/bio");
  createHandler(fastify, "PATCH", "user", "/bio");
  createHandler(fastify, "PATCH", "user", "/username");
  createHandler(fastify, "PATCH", "user", "/firebase-user-id");
  createHandler(fastify, "PATCH", "user", "/messaging-token");
  createHandler(fastify, "GET", "user", "/active-wallet");
  createHandlerWithoutPrefix(fastify, "PUT", "user", "/country");

  // Accept Terms & Conditions
  createHandler(fastify, "PATCH", "user", "/relic-tcs");

  // Private accounts
  createHandler(fastify, "PATCH", "user", "/private-account");
  createHandler(fastify, "PATCH", "user", "/custom-like-amount");
  createHandler(fastify, "GET", "content", "/search/private-profiles");

  createHandler(fastify, "GET", "user", "/profile-pic/:id");
  createHandler(fastify, "GET", "user", "/profile-pic");
  createHandler(fastify, "PUT", "user", "/profile-pic");

  createHandler(fastify, "GET", "user", "/banner-pic/:id");
  createHandler(fastify, "GET", "user", "/banner-pic");
  createHandler(fastify, "PUT", "user", "/banner-pic");
  createHandler(fastify, "DELETE", "user", "/banner-pic");

  // Activity
  createHandler(fastify, "GET", "user", "/activity/post-earnings");
  createHandler(fastify, "GET", "user", "/activity/tags");
  createHandler(fastify, "GET", "user", "/activity/total-earned");

  // Following / Followers
  createHandler(fastify, "GET", "user", "/followers/:id");
  createHandler(fastify, "GET", "user", "/following/:id");

  createHandler(fastify, "PUT", "user", "/wallet/one-click/enabled");
  createHandler(fastify, "PUT", "user", "/wallet/one-click/disabled");

  createHandler(fastify, "PATCH", "user", "/dark-mode");

  /* ----  BLOCKCHAIN ---- */
  createHandler(fastify, "POST", "blockchain", "/comment");
  createHandler(fastify, "POST", "blockchain", "/comment/bio");

  createHandler(fastify, "POST", "blockchain", "/like");
  createHandler(fastify, "POST", "blockchain", "/picture/encrypt");
  createHandler(fastify, "POST", "blockchain", "/picture/profile");
  createHandler(fastify, "POST", "blockchain", "/dummy/firebase/:token");
  createHandler(fastify, "POST", "blockchain", "/hc/success");

  /* ----  CONTENT ---- */
  createHandler(fastify, "GET", "content", "/latest");
  createHandler(fastify, "GET", "content", "/latest-for-user");
  createHandler(fastify, "GET", "content", "/desktop/latest-for-user");
  createHandler(fastify, "GET", "content", "/most-likes");
  createHandler(fastify, "GET", "content", "/most-comments");
  createHandler(fastify, "GET", "content", "/test");
  createHandler(fastify, "GET", "content", "/comments");
  createHandler(fastify, "GET", "content", "/picture/:id");
  createHandler(fastify, "GET", "content", "/picture/info/:id");
  createHandler(fastify, "GET", "content", "/search/hashtag/:filter");
  createHandler(fastify, "GET", "content", "/search/user/:id");
  createHandler(fastify, "GET", "content", "/search/most-followers");
  createHandler(fastify, "GET", "content", "/user-pictures-content-ids");

  createHandler(fastify, "POST", "content", "/like/prepare");
  createHandler(fastify, "PATCH", "content", "/like/:id");
  createHandler(fastify, "PATCH", "content", "/unlike/:id");

  createHandler(fastify, "POST", "content", "/comment/prepare");
  createHandler(fastify, "POST", "content", "/picture/prepare");
  createHandler(fastify, "POST", "content", "/picture/first");
  createHandler(fastify, "POST", "content", "/picture/prepare/v2");
  createHandler(fastify, "PUT", "content", "/picture/hide/:id");

  createHandler(fastify, "PATCH", "content", "/hide/comment/:id");
  createHandler(fastify, "PATCH", "content", "/hide/picture/:id");

  createHandler(fastify, "POST", "content", "/favourites/prepare");
  createHandler(fastify, "PATCH", "content", "/fav/:id");
  createHandler(fastify, "PATCH", "content", "/unfav/:id");
  createHandler(fastify, "GET", "content", "/favourites");

  createHandler(fastify, "POST", "content", "/follow/prepare");

  createHandler(fastify, "GET", "content", "/leaderboard");
  createHandler(fastify, "POST", "content", "/dark-mode/prepare");
  createHandler(fastify, "POST", "content", "/prepare/maps");
  createHandler(fastify, "POST", "content", "/private-account/prepare");

  /* ----  RELIC ---- */
  createHandler(fastify, "GET", "relic", "/unlock");
  createHandler(fastify, "GET", "relic", "/unlock-my-relic/:relicId");
  createHandler(fastify, "POST", "relic", "/");
  createHandler(fastify, "GET", "relic", "/discover");
  // createHandler(fastify, "GET", "relic", "/countries");
  createHandler(fastify, "GET", "relic", "/bury-check");
  createHandler(fastify, "GET", "relic", "/my-buried");
  createHandler(fastify, "GET", "relic", "/others");
  createHandler(fastify, "GET", "relic", "/user/:id");
  createHandler(fastify, "GET", "relic", "/id/:id");
  createHandler(fastify, "GET", "relic", "/my-discovered");
  createHandler(fastify, "POST", "relic", "/prepare/relic");
  createTxIdHandler(fastify, "PUT", "relic", "/tx-id");
  // createUnlockTransactionHandler(fastify, "POST", "relic", "/create-unlock-transaction");

  /* ----  UNLOCK RELIC AND CREATE TRANSACTION ---- */
  unlockAndCreateTransactionHandler(fastify, "GET", "relic", "/unlock-relic");
  unlockMyRelicAndCreateTransactionHandler(fastify, "GET", "relic", "/unlock-mine/:relicId");

  /* ---- WALLET ---- */
  createHandler(fastify, "PUT", "user", "/wallet/relica");
  createGetWalletHandle(fastify, "GET", "user", "/wallet/relica");
  createHandler(fastify, "GET", "user", "/wallet/relica/email-exists");
  createHandler(fastify, "GET", "user", "/wallet/relica/recover");
  createHandler(fastify, "DELETE", "user", "/wallet/relica/remove");
  createHandler(fastify, "GET", "user", "/wallet/relica/login");

  /* ---- NFT Screen ---- */
  createHandler(fastify, "GET", "relic", "/order/:orderId");
  createHandler(fastify, "GET", "relic", "/orders/filled");
  createHandler(fastify, "GET", "relic", "/orders/open");
  createHandler(fastify, "GET", "relic", "/nft/mine")
};

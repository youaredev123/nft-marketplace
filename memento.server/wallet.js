const Mnemonic = require('bsv/mnemonic')
const HDPrivateKey = require('bsv').HDPrivateKey;
const WalletHelper = require('./wallet/WalletHelper');

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

createBSVWallet = (request) => {
    const mnemonic = !request.body.mnemonic ? Mnemonic.fromRandom() : Mnemonic.fromString(request.body.mnemonic);
    const hdPrivateKey = HDPrivateKey.fromSeed(mnemonic.toSeed(), process.env.BSV_NETWORK);
    const bsvChild = hdPrivateKey.deriveChild("m/44'/0'/0'/0");
    const jigChild = hdPrivateKey.deriveChild("m/44'/0'/1'/0");
    const currentBsvChildAddress = bsvChild.publicKey.toAddress(process.env.BSV_NETWORK).toString();
    const currentJigChildAddress = jigChild.publicKey.toAddress(process.env.BSV_NETWORK).toString();
    const currentBsvPrivateKey = bsvChild.privateKey.toWIF();
    const currentJigPrivateKey = jigChild.privateKey.toWIF();

    const walletInfo = {
        currentBsvChildAddress,
        currentJigChildAddress,
        currentBsvPrivateKey,
        currentJigPrivateKey,
        mnemonic: mnemonic.toString(),
    };

    return { status: 200, data: { walletInfo } }; 
};

sendBSV = async (request) => {
    const walletHelper = new WalletHelper(request.body.owner, request.body.purse);
    const response = await walletHelper.sendBSV(request.body.address, request.body.amount);

    return { status: 200, data: response }; 
}

module.exports = function (fastify) {
    createHandler(fastify, "POST", "relic", "/create-bsv-wallet", createBSVWallet);
    createHandler(fastify, "POST", "relic", "/send-bsv", sendBSV);
}
const Run = require('run-sdk')
const { expect } = Run.extra;
const NftCollection = require('../smartcontract/NftCollection')

const upgrade = async (classLocation, run) => {
  run.trust("*");
  try {
    const nftCollection = await run.load(classLocation);
    await nftCollection.sync();
    nftCollection.upgrade(NftCollection);
    await nftCollection.sync();
    return { status: true, nftCollection};
  } catch (e) {
    return { status : false,  error : e};
  }
};

module.exports = upgrade;

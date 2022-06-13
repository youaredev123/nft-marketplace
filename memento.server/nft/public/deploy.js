const Run = require('run-sdk')
const NftCollection = require('../smartcontract/NftCollection')

const deploy = async (run) => {
  try {
    const nftCollection =  run.deploy(NftCollection);
    await nftCollection.sync();
    return { status: true, nftCollection };
  } catch (e) {
    return { status : false,  error : e };
  }
};

module.exports = deploy;

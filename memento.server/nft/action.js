const RunHelper = require('./runHelper');
const Run = require('run-sdk')

const Mnemonic = "journey paddle flat gravity lunch humble until envelope follow muffin pole high";   //wallet 1
//const Mnemonic = "captain comic vault cigar prosper diary year soldier adapt lonely key eyebrow"; //wallet 2

//const Mnemonic = "early endless movie limb aunt december senior warfare tragic strategy wet among"; //wallet 3

const network = "test";

const smartContractLocation = "adbeaae7cf57b33d2c0a403faafc98f8784ddd51a95e848afee41b213b16f38d_o1";

const runHelper = new RunHelper(Mnemonic, network);
const run = runHelper.initialize();


const deploy = async () => {
  const result = await runHelper.deploy();

  if (result.status) {
    console.log("deploy success: " + result.nftCollection.location);
  }  else {
    console.log("deploy fail: " + result.error);
  }
}


const upgrade = async () => {
  const reuslt = await runHelper.upgrade(smartContractLocation);
  if (reuslt.status) {
    console.log("upgrade success: " + reuslt.nftCollection.location);
  }  else {
    console.log("upgrade fail: " + reuslt.error);
  }
}

const createNFTCollection = async () => {
  run.trust('*');
  const NftCollection = await run.load(smartContractLocation);
  await NftCollection.sync();
  const nftCollection = new NftCollection('Bronze1', 5000);
  await nftCollection.sync();
  console.log('create nft collection success', nftCollection.location);
}


const createNFT = async (to) => {
  run.trust('*');
  const nftCollectionLocation = "df498e3da26b284cfae1dac30f4661faf77700840ecbbcb1ece2c352884a7bb7_o2";
  const nftCollection = await run.load(nftCollectionLocation);
  await nftCollection.sync()
  const nft = nftCollection.mint(to, 'test1', 'test2');
  await run.sync()
  console.log('create nft success', nft.location);
}

const sellNFT = async (location, satoshis) => {
  run.trust('*');
  await runHelper.sell(location, satoshis);
  console.log("sell success");
}

const buyNFT = async (location) => {
  run.trust('*');
  await runHelper.buy(location);

}

//console.log(myBuffer);
//console.log(Buffer.from('455ed7f6-6a7f-481f-a433-26b4b023fd33').toArray());

//console.log( Run.extra.Hex.bytesToString(sha256(myBuffer)));


deploy();
//console.log(Buffer.from('dasdads'));
//upgrade();
//createNFTCollection();

//createNFT('mwEcGNdUdc2PnLsULH8RJu1TYYpnE2qBHu');

//sellNFT('05daa26a9e23561bc7057f271618ebfb535927a1dec7b42c05c424a0680f4d0d_o2', 1002);

//buyNFT("0d54d2ae6baf39d5b04415e51e4e994263af7bd7cb48b880675ab044178e9eca_o2");

//exports.modules = { createNFT , createcreateNFTCollection }


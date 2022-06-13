const { HDPrivateKey, Transaction, crypto, Script, Address } = require('bsv');
const Run = require('run-sdk')
const Mnemonic = require('bsv/mnemonic')

class RunHelper {

  static relicaKey = "455ed7f6-6a7f-481f-a433-26b4b023fd33";

  constructor(mnemonicString = null, network = 'main') {
    if (mnemonicString) {
      this.mnemonic = Mnemonic.fromString(mnemonicString);
      this.hdPrivateKey = HDPrivateKey.fromSeed(this.mnemonic.toSeed(), (network !== 'main') ? 'testnet' : 'mainnet');

      this.netowrk = network;
    }
    this.network = network;
    this.orderLockLocation = network !== 'main' ? "2af7582574e103513c3ce7503b7a16c51d601fd2434654c59c0c3c55ddd4cf3d_o1" : "d6170025a62248d8df6dc14e3806e68b8df3d804c800c7bfb23b0b4232862505_o1";
  }

  initialize(network = null, purse = null, owner = null) {
    this.run = new Run({
      network: network || this.network,
      purse: purse || this.hdPrivateKey.deriveChild(RunHelper.BSV_PATH).privateKey.toString(),
      owner: owner || this.hdPrivateKey.deriveChild(RunHelper.JIG_PATH).privateKey.toString(),
    });
    this.run.trust('*');
    return this.run;
  }

  getLockingScript = (rawtx, idx) => {
    return Transaction(rawtx).outputs[idx];
  }

  getCancelUtxo(rawtx, idx) {
    const bsvtx = new Transaction(rawtx);
    const address = Address.fromScript(bsvtx.outputs[idx].script).toString();
    let utxo = new Transaction.UnspentOutput({
      "address": address,
      "txid": bsvtx.hash,
      "vout": idx,
      "satoshis": bsvtx.outputs[idx].satoshis,
      "scriptPubKey": bsvtx.outputs[idx].script.toHex(),
      "outputIndex": idx
    });
    return utxo;
  }

  async deploy() {
    const deploy = require('./public/deploy');
    return await deploy(this.run);
  }

  async upgrade(location) {
    const upgrade = require('./public/upgrade');
    return await upgrade(location, this.run);
  }

  async runBase(location, cancel) {
    const lockedTokens = await this.run.load(location);
    const tx = new Run.Transaction();

    if (!cancel) {
      const base = Transaction();
      base.to(lockedTokens.owner.address, lockedTokens.owner.satoshis);
      base.to(lockedTokens.owner.relicaAddress, lockedTokens.owner.relicaSatoshis);
      tx.base = base.toString('hex');
    }

    tx.update(() => {
      lockedTokens.send(this.run.owner.address, RunHelper.relicaKeyToBytes());
    });
    const raw = await tx.export({ sign: false, pay: true });
    tx.rollback();
    return raw;
  }

  async unlockToken(tx, inputIndex, lockingScript, satoshis, cancel) {
    const template = '$preimage $trailingPrevouts $isCancel';
    const preimageSigHashType = (cancel ? crypto.Signature.SIGHASH_NONE : (crypto.Signature.SIGHASH_SINGLE | crypto.Signature.SIGHASH_ANYONECANPAY)) | crypto.Signature.SIGHASH_FORKID;
    const scriptCode = Script.fromHex(lockingScript);
    const value = new crypto.BN(satoshis);
    const preimg = Transaction.sighash.sighashPreimage(tx, preimageSigHashType, inputIndex, scriptCode, value).toString('hex');
    const asm = template
      .replace('$preimage', preimg)
      .replace('$trailingPrevouts', '0')
      .replace('$isCancel', cancel ? 'OP_TRUE' : 'OP_FALSE');

    return Script.fromASM(asm).toHex();
  }

  async createNftCollection(jigClassLocation, name, supply, staticImageTxId, animationImageTxId) {
    this.run.timeout = 90000;
    const NftCollection = await this.run.load(jigClassLocation);
    await NftCollection.sync()

    let nftCollection = new NftCollection(name, supply, staticImageTxId, animationImageTxId);
    await nftCollection.sync()
    return nftCollection;
  }

  // Obsolete
  // async getJigs(type = "Nft") {
  //   this.run.timeout = 90000;
  //   await this.run.inventory.sync();
  //   return this.run.inventory.jigs.filter(jig => jig.constructor.name === type);
  // }

  async createSingleNft(location, relicaData, owner) {
    const nftCollection = await this.run.load(location);
    console.log(nftCollection);
    await nftCollection.sync();
    const nft = nftCollection.mint(owner, relicaData.userId, relicaData.nftId);
    await nft.sync()
    return nft;
  }

  async sell(location, satoshis) {
    this.run.timeout = 120000;
    const nft = await this.run.load(location);
    await nft.sync();

    //await this.run.inventory.sync();
    //const tokens = this.run.inventory.jigs.filter(jig => jig === nft);

    // if (tokens.length === 0) {
    //     return { status : false , message : "Invalid nft token" };
    // }

    const base = Transaction();
    base.to(this.run.purse.address, 546);
    const runtx = new Run.Transaction();
    runtx.base = base.toString('hex');
    const OrderLock = await this.run.load(this.orderLockLocation);
    
    const relicaSatoshis = Math.floor((satoshis * 5)/100);
    satoshis = satoshis - relicaSatoshis;
    const relicaAddress = process.env.RELICA_ADDRESS;
    const salesOrder = new OrderLock(this.run.purse.address, satoshis, relicaAddress, relicaSatoshis);

    runtx.update(() => {
      nft.send(salesOrder, RunHelper.relicaKeyToBytes());
    });

    const rawtx = await runtx.publish();

    await nft.sync();

    return { status: true, rawtx, nft };
  }

  async buy(location, cancel, cancelIdx) {
    this.run.timeout = 90000;
    const nft = await this.run.load(location);
    await nft.sync();

    const txid = nft.location.slice(0, 64);
    const idx = parseInt(nft.location.slice(-1));
    const rawtx = await this.run.blockchain.fetch(txid);
    const lockingScript = this.getLockingScript(rawtx, idx);
    const rawRunTx = await this.runBase(nft.location, cancel);
    const runTx = Transaction(rawRunTx);
    runTx.inputs[0].output = runTx.outputs[1];

    if (cancel) {
      runTx.from(this.getCancelUtxo(rawtx, cancelIdx));
      runTx.sign(this.run.purse.bsvPrivateKey);
    }

    const solution = await this.unlockToken(runTx, 0, lockingScript.script.toHex(), lockingScript.satoshis, cancel);
    runTx.inputs[0].setScript(solution);
    await this.run.blockchain.broadcast(runTx.toString('hex'));

    return { status: true, nft };
  }

  static relicaKeyToBytes() {
    var myBuffer = [];
    var buffer = new Buffer(RunHelper.relicaKey, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
    }

    return myBuffer;
  }
}

RunHelper.BSV_PATH = "m/44'/0'/0'/0"
RunHelper.JIG_PATH = "m/44'/0'/1'/0"

module.exports = RunHelper;

const Run = require('run-sdk');
const Address = require('bsv').Address;
const Transaction = require('bsv').Transaction;

class WalletHelper {
  constructor(owner, purse) {
    if (purse && owner) {
      const api = 'run';
      const app = 'Relica';
      const timeout = 60000;
      this.feePerKb = 500;
      this.feeThreshold = 1.1;
      this.network = process.env.NETWORK;
      this.run = new Run({ network: this.network, owner, purse, api, app, timeout })
      this.run.trust('*');
      this.run.activate();
    } else {
      console.error('Error initializing owner and purse keys.')
    }
  }

  getBlockchain(blockchain = 'run') {
    let network = this.network;
    if (!this.blockchain) {
      switch (blockchain) {
        case 'run':
          this.blockchain = new Run.plugins.RunConnect({ network });
          break;
        default:
          this.blockchain = new Run.plugins.RunConnect({ network });
      }
    }
    return this.blockchain;
  }


  getPurse(attibute) {
    switch (attibute) {
      case 'privateKey':
        return this.run.purse.bsvPrivateKey.toWIF();
      case 'address':
        return this.run.purse.address;
    }
  }

  sendBSV = async (address, amount) => {
    const validAddr = Address.isValid(address);
    if (!address || (!address.includes('@') && !address.includes('$') && !validAddr)) {
      return 'invalidAddress';
    }
    amount = parseInt(parseFloat(amount) * 100000000);
    const utxos = await this.getUTXOs(this.getPurse('address'), amount, this.feeThreshold);
    if (utxos.length > 0) {
      const sent = await this.send(utxos, address, amount);
      if (typeof sent === 'object') {
        let bsvtxExplorer = this.network === 'test' ? 'https://test.whatsonchain.com/tx/' : 'https://whatsonchain.com/tx/';
        bsvtxExplorer += sent.txid;
        return { sent, ...{ bsvtxExplorer } };
      }

      return sent != null ? sent : 'unexpectedError';
    }
    return 'notEnoughFund';
  }

  getUTXOs = async (address, amount, feeThreshold) => {
    let utxos = await this.getBlockchain().utxos(address);
    let cache = [], satoshis = 0;
    for (let utxo of utxos) {
      cache.push(utxo);
      if (amount) {
        satoshis = cache.reduce((a, curr) => { return a + curr.satoshis }, 0);
        if (satoshis >= amount * feeThreshold) { return cache }
      }
    }
    return [];
  }

  broadcastTx = async (utxos, address, amount, change, exportRawTx) => {
    const transaction = new Transaction();
    transaction.feePerKb(this.feePerKb);
    const tx = transaction.from(utxos).to(address, amount).change(change ? change : this.getPurse('address')).sign(this.getPurse('privateKey'));
    const rawtx = tx.toString();
    if (exportRawTx) { return rawtx }
    let txid;
    try {
      txid = await this.getBlockchain().broadcast(rawtx);
      return { txid, rawtx, utxos };
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

  send = async (utxos, to, amount) => {
    if (to.includes('@') || to.includes('$') || (to.includes('1'))) {
      let res = await fetch(`https://api.polynym.io/getAddress/${to}`);
      let { address } = await res.json();
      if (!address) {
        return 'invalidPaymailAddress';
      }
      let r = await this.broadcastTx(utxos, address, amount);
      return r;
    }
    else {
      let r = await this.broadcastTx(utxos, to, amount);
      return r;
    }
  }
};

module.exports = WalletHelper;

const Run = require('run-sdk')
const { sha256, Hex  } = Run.extra;
const RunHelper = require('../runHelper');

class Nft extends Jig {

  init (nftCollection, index, owner, userId) {
    Nft.auth();
    this.nftCollection = nftCollection
    this.index = index
    this.owner = owner
    this.userId = userId
  }

  send (to, relicaKey) {
    if (Nft.relicaKey !== this.hashRelicaKey(relicaKey)) {
      throw new Error('Invalid relica key');
    }
    this.owner = to
  }

  setUserId (userId, relicaKey) {
    if (Nft.relicaKey !== this.hashRelicaKey(relicaKey)) {
      throw new Error('Invalid relica key');
    }
    this.userId = userId;
  }

  hashRelicaKey(relicaKey) {
    return Hex.bytesToString(sha256(relicaKey));
  }
}

Nft.relicaKey = Hex.bytesToString(sha256(RunHelper.relicaKeyToBytes()));

Nft.deps = {
  sha256,
  Hex
}

module.exports = Nft;

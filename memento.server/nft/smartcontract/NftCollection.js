const Run = require('run-sdk')
const Nft = require('./Nft');
const { expect } = Run.extra

class NftCollection extends Jig {
  init (name, supply, staticImage, animationImage) {
    NftCollection.auth();
    expect(name).toBeString()
    expect(supply).toBeInteger()
    this.name = name
    this.maxNfts = supply
    this.staticImage = staticImage
    this.animationImage = animationImage
    this.nftCreated = 0
  }

  mint(owner, userId, nftId) {
    NftCollection.auth();
    if (this.nftCreated >= this.maxNfts) {
      throw new Error('no more nft left')
    }

    this.nftCreated = this.nftCreated + 1
    return new Nft(this, this.nftCreated, owner, userId, nftId)
  }
}

NftCollection.deps = {
  expect,
  Nft
}

NftCollection.metadata = {
  staticImage: this.staticImage,
  animationImage: this.animationImage
}

module.exports = NftCollection;

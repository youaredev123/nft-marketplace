import React from "react";
import {
  SatchelAvatar,
  SatchelImageContainer,
  SatchelItemContainer,
  SatchelItemProfileContainer,
  SatchelItemProfileTitle
} from "./styles";

const SatchelItem = ({nft}) => {
  nft = {
    ...nft,
    index: nft.rarity.split('/')[0]
  }
  const renderImage = () => {
    if (nft && nft.staticImageLocation) {
      nft.pictureUrl = `https://media.bitcoinfiles.org/${nft.staticImageLocation}`;
    } else {
      nft.pictureUrl = 'https://media.bitcoinfiles.org/3d67a74f86567017c913c63d659b2212a08b413af2d70f1ed4f9ded201155c5e';
    }

    return (
      <SatchelAvatar width={100} height={100} url={nft.pictureUrl}/>
    );
  }

  return (
    <div style={{position: "relative"}}>
      <SatchelItemContainer>
        <SatchelImageContainer>
          {renderImage()}
        </SatchelImageContainer>

        <SatchelItemProfileContainer>
          <div>
            {nft &&
              <SatchelItemProfileTitle>
                {nft.title} <span>#{nft.index}</span>
              </SatchelItemProfileTitle>
            }

            <div style={{ color: "DarkGrey" }}>
              1 of {nft.rarity.split('/')[1]}
            </div>
          </div>
        </SatchelItemProfileContainer>
      </SatchelItemContainer>
    </div>
  );
};

export default SatchelItem;

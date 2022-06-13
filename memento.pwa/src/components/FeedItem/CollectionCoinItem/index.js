import React from "react";
import {
  CollectionCoinAvatar,
  CollectionCoinImageContainer,
  CollectionCoinItemContainer,
  CollectionCoinItemProfileContainer,
  CollectionCoinItemProfileTitle
} from "./styles";

const CollectionCoinItem = ({relic, collection}) => {
  const splittedRarity = relic.rarity.split('/');

  const renderImage = () => {
    if (relic && collection.staticImageLocation) {
      relic.pictureUrl = `https://media.bitcoinfiles.org/${collection.staticImageLocation}`;
    } else {
      relic.pictureUrl = 'https://media.bitcoinfiles.org/3d67a74f86567017c913c63d659b2212a08b413af2d70f1ed4f9ded201155c5e';
    }

    return (
      <CollectionCoinAvatar width={100} height={100} url={relic.pictureUrl}/>
    );
  }

  return (
    <div style={{position: "relative"}}>
      <CollectionCoinItemContainer>
        <CollectionCoinImageContainer>
          {renderImage()}
        </CollectionCoinImageContainer>

        <CollectionCoinItemProfileContainer>
          <div>
            <CollectionCoinItemProfileTitle>
              {collection.title} <span>#{splittedRarity[0]}</span>
            </CollectionCoinItemProfileTitle>

            <div style={{ color: "DarkGrey" }}>
              1 of {splittedRarity[1]}
            </div>
          </div>
        </CollectionCoinItemProfileContainer>
      </CollectionCoinItemContainer>
    </div>
  );
};

export default CollectionCoinItem;

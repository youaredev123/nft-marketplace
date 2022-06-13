import React from "react";
import {
  MarketAvatar,
  MarketImageContainer,
  MarketItemContainer,
  MarketItemProfileContainer,
  MarketItemProfileTitle,
  RaritySpan,
  PriceLabel
} from "./styles";

const MarketItem = ({order}) => {
  const isFilled = (filled) => {
    return filled ? 'sold' : '';
  }
  
  const renderImage = () => {
    if (order && order.staticImageLocation) {
      order.pictureUrl = `https://media.bitcoinfiles.org/${order.staticImageLocation}`;
    } else {
      order.pictureUrl = 'https://media.bitcoinfiles.org/3d67a74f86567017c913c63d659b2212a08b413af2d70f1ed4f9ded201155c5e';
    }

    return (
      <MarketAvatar width={100} height={100} url={order.pictureUrl}/>
    );
  }

  return (
    <div style={{position: "relative"}}>
      <MarketItemContainer>
        <MarketImageContainer>
          {renderImage()}
        </MarketImageContainer>

        <MarketItemProfileContainer>
          <div>
            <MarketItemProfileTitle>
              {order.title} <span>#{order.index}</span>
            </MarketItemProfileTitle>

            <RaritySpan>
              1 of {order.rarity.split('/')[1]}
            </RaritySpan>

            <PriceLabel className={isFilled(order.filled)}>
              <div>{`$${parseFloat(order.satoshis).toFixed(2)}`}</div>
            </PriceLabel>
          </div>
        </MarketItemProfileContainer>
      </MarketItemContainer>
    </div>
  );
};

export default MarketItem;

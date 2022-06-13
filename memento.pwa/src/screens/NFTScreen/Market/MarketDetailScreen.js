import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import MarketDetailItem from "../../../components/FeedItem/MarketDetailItem";
import NotFound from "../../../components/NotFound";
import NftService from "../../../services/NftService";
import { useParams } from "react-router-dom";
import CurrencyConverter from '../../../lib/currencyConverter';

import {
  FullHeight,
  MarketItemTitle,
  NFTNote,
  SoldButton
} from "./styles";
import Loader from "../../../components/Loader";
import {PostButton} from "../../NewPostScreen/styles";
import ConfirmPurchaseModal from "../../../components/ConfirmPurchaseModal";

const MarketDetailScreen = () => {
  const { id } = useParams();
  const [relic, setRelic] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [shouldShowConfirmPurchaseModal, setShouldShowConfirmPurchaseModal] = useState(false);
  const [isFilled, setIsFilledRelic] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await NftService.getOrderById(id);
      if (response.hasError) {
        setNotFound(true);
      } else {
        response.data.satoshis = await CurrencyConverter.convertFromSatoshi(response.data.satoshis);

        const extractedRarityVals = response.data.rarity.split('/');
        const relic = {
          ...response.data,
          index: extractedRarityVals[0],
          maxSupply: extractedRarityVals[1]
        };
        
        setRelic(relic);
        if (response.data.filled) 
          setIsFilledRelic(response.data.filled);
      }
    })();
  }, []);

  if (notFound) {
    return <NotFound/>;
  }

  return <FullHeight>
    <Header 
      hasBack
      title="Market"
      isMarketDetail={true}
      isFilled={isFilled}
    />
    {relic
      ? <>
        <MarketDetailItem
          key={id}
          relic={relic}
          border={false}
          canNavigate={false}
          isBig={true}
        />
        <div className="p-5">
          <MarketItemTitle>
            <div className="title">{relic.title} 
              <span className="index"> #{relic.index} </span>  
              <span className="rarity"> ({relic.rarity}) </span>
            </div>
          </MarketItemTitle>

          <NFTNote>
            {relic.note}
          </NFTNote>

          {!relic.filled ? <PostButton
            style={{boxShadow: "none", width: "80%", margin: "0 auto"}}
            className="primary"
            onClick={() => setShouldShowConfirmPurchaseModal(true)}
          >
            Buy now ${relic.satoshis}
          </PostButton> : <SoldButton
            style={{boxShadow: "none", width: "80%", margin: "0 auto"}}
            className="sold-out"
          >
            Sold for ${relic.satoshis}
          </SoldButton>}
        </div>
        <ConfirmPurchaseModal
          show={shouldShowConfirmPurchaseModal}
          onHide={() => setShouldShowConfirmPurchaseModal(false)}
          item={relic}
        />
      </>
      : <Loader style={{position: "absolute", left: "50%", top: "50%"}}/>
    }
  </FullHeight>;
};

export default MarketDetailScreen;

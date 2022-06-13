import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import MarketDetailItem from "../../../components/FeedItem/MarketDetailItem";
import NotFound from "../../../components/NotFound";
import NftService from "../../../services/NftService";
import CurrencyConverter from "../../../lib/currencyConverter";

import {
  FullHeight,
  PostButton,
  SidesMarginContainer,
  SatchelItemTitle,
  NFTNote
} from "./styles";
import Loader from "../../../components/Loader";
import Input from "../../../components/Form/Input";
import useToast from "hooks/useToast";
import ErrorToast from "components/Toasts/ErrorToast";
import GenericMessage from "components/Toasts/GenericMessage";
import { hasAnyEmptyField } from "lib/utils";

const MarketDetailScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [relic, setRelic] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [amount, setAmount] = useState("");
  const [ walletInfo, setWalletInfo ] = useState();
  const history = useHistory();
  const { showToast } = useToast();

  const onAmountChange = (value) => {
    setAmount(value);
  };

  const amountInStsh = async (amount) => {
    const satoshis = await CurrencyConverter.convertToSatoshi(+amount);
    return Math.floor(satoshis);
  }

  const listForSale = async (data) => {
    const hasEmptyField = hasAnyEmptyField(data);
    if (hasEmptyField) return showToast(<ErrorToast text="Please full-fill the form." />);
    
    setLoading(true);

    const res = await NftService.sellNFT(data, walletInfo.password);
    if (res && !res.hasError) {
      showToast(<GenericMessage text="Your NFT is listed for sale." />);
      return history.push('/nft/market');
    } else {
      showToast(<ErrorToast text="Something went wrong!" />);
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
      if (!walletInfo) return history.push('/wallet/login');

      setLoading(true);
      setWalletInfo(walletInfo);

      let response = await NftService.getNFTById(id, walletInfo.password);
      if (response.hasError) {
        setNotFound(true);
      } else {
        const splitedRarity = response.data.rarity.split('/');
        const relic = {
          ...response.data,
          index: splitedRarity[0],
          total: splitedRarity[1]
        };
        
        setRelic(relic);
      }
      setLoading(false);
    })();
  }, []);

  if (notFound) {
    return <NotFound/>;
  }

  return <FullHeight>
    <Header 
      hasBack
      title="Minted NFTs"
    />
    { loading ? <Loader style={{position: "absolute", left: "50%", top: "50%"}} /> : relic
      ? <>
        <MarketDetailItem
          key={id}
          relic={relic}
          border={false}
          canNavigate={false}
          isBig={true}
        />
        <div className="p-5">
          <SatchelItemTitle>
            <div className="title">{relic.title}
              <span className="index"> #{relic.index} </span>
              <span className="rarity"> ({relic.rarity}) </span>
            </div>
          </SatchelItemTitle>
          <NFTNote>
            {relic.note}
          </NFTNote>
        </div>


        <SidesMarginContainer>
          <div style={{display: "grid", gridTemplateColumns: "1.5fr 1fr"}}>
            <Input name="relic-value"
              type="number"
              placeholder="$ Price"
              value={ amount }
              inputClassName="text-left"
              onChange={(val) => onAmountChange(val)}
            />

            <PostButton className="primary"
              onClick={async () => {
                listForSale({
                  nftId: id,
                  type: relic.title,
                  satoshis: await amountInStsh(+amount)
                });
              }}>
              List for sale
            </PostButton>
          </div>

          <div className="relica-note">
            Upon purchase Relica charges 5% on sale price
          </div>
        </SidesMarginContainer>
      </>
      : null
    }
  </FullHeight>;
};

export default MarketDetailScreen;

import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import NftService from "../../services/NftService";
import {ConfirmPurchaseModalContent, ModalHeaderContainer, PostButton} from "./styles";
import Loader from "components/Loader";

export default ({ show, onHide, item }) => {
  const history = useHistory();
  const [ loading, setLoading ] = useState(false);

  const purchaseNFT = async (orderId) => {
    const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
    if (!walletInfo) history.push('/wallet/login');
    
    setLoading(true);
    const requestBody = {
      orderId: orderId
    };

    const result = await NftService.buyNFT(requestBody, walletInfo.password);
    if (result && !result.hasError) {
      setLoading(false);
      history.push('/nft/satchel');
      return;
    }
  };

  return (
    <>
    {loading ? <Loader style={{position: "absolute", left: "50%", top: "50%"}}/> : 
    <ModalContainer show={show} customBody={true} onClose={onHide} height={"260px"}>
      <ConfirmPurchaseModalContent>
        <ModalHeaderContainer>
          Confirm purchase
        </ModalHeaderContainer>
        <div className="p-4">
          <img src={item.pictureUrl} alt={item.pictureUrl} width={100}/>
          <PostButton className="primary" onClick={() => purchaseNFT(item.orderId)}>
            Buy now ${item.satoshis}
          </PostButton>
        </div>
      </ConfirmPurchaseModalContent>
    </ModalContainer>}
    </>
  );
};

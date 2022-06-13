import React, { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button";
import { isPwa } from "../../components/AuthLayout";
import { FormContainer, QRCodeContainer, ReceiveLabel } from "./styles";
import { Title } from "../../components/Header/styles";
import Input from "../../components/Form/Input";
import Header from "../../components/Header";
import { useWallet } from "../../hooks/useWallet"
import useToast from "../../hooks/useToast";
import GenericMessage from "../../components/Toasts/GenericMessage";
import { useHistory } from "react-router-dom";
const QRCode = require('qrcode.react');

const ReceiveBSVScreen  = () => {
  const { getWallet } = useWallet();
  const [ wallet , setWallet ] = useState(false);
  const { showToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const wallet = getWallet();
    if (!wallet) {
      history.push('/wallet/login');
    }
    setWallet(wallet);
  }, []);

  return (
    <>
      <Header hasBack titleOnly title={<Title>Receive BSV</Title>} />
      <ReceiveLabel>Bitcoin SV address</ReceiveLabel>
      <QRCodeContainer>
        <QRCode style={{display : "block", margin : "auto", marginTop : "50px"}} value={wallet ? wallet.currentBsvChildAddress : ''} />
      </QRCodeContainer>
      <FormContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div style={{ width: "80%", marginTop: "30px" }} className="mb-4">
            <Input
              disabled={true}
              placeholder="Enter address or paymail"
              inputClassName="text-left"
              value={wallet ? wallet.currentBsvChildAddress : ''}
            />
          </div>
        </div>
      </FormContainer>
      <Button
        className="primary"
        style={{
          padding: "17px",
          fontSize: "18px",
          width: "80%",
          margin: `80px auto ${
            window.mobileCheck() && !isPwa() ? "75px" : "25px"
          }`
        }}
        onClick={() => {
          if (wallet) {
            window.navigator.clipboard.writeText(wallet.currentBsvChildAddress);
            showToast(<GenericMessage text="Copied to clipboard" />);
          }
        }}
      >
        Copy address
      </Button>
    </>
  );

}

export default ReceiveBSVScreen;

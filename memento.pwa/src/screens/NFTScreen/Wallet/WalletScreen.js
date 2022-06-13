import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { isPwa } from "../../../components/AuthLayout";
import WalletCard from "../../../components/WalletCard"
import { useHistory } from "react-router-dom";
import { useWallet } from "../../../hooks/useWallet"
import { ButtonGroup } from './styles';

const WalletScreen  = () => {
  const history = useHistory();
  const { getWallet } = useWallet();
  useEffect(() => {
    const wallet = getWallet();
    if (!wallet) {
      return history.push('/wallet/login');
    }
  }, []);

  return (
    <>
      <WalletCard />
      <ButtonGroup>
        <Button
          className="primary"
          onClick={() => {
            history.push(`/wallet/send`)
          }}
        >
          Send
        </Button>
        <Button
          onClick={() => {
            history.push(`/wallet/receive`)
          }}
        >
          Receive
        </Button>
      </ButtonGroup>
    </>
  );

}

export default WalletScreen;

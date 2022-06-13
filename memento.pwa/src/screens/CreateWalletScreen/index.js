import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import WalletInfo from "./WalletInfo";
import CustomHandle from "./CustomHandle";
import { useWallet } from "../../hooks/useWallet"
import Header from "../../components/Header";
import Loader from "../../components/Loader";

const CreateWalletScreen = ({ onSave }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const history = useHistory();
  const { getWallet } = useWallet();

  const setWalletInfo = (email, password) => {
    setEmail(email);
    const encodedPassword = Buffer.from(password).toString('base64');
    setPassowrd(encodedPassword);
  }

  const handleNext = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    const wallet = getWallet();
    if(wallet && wallet.currentBsvChildAddress) {
      history.push('/nft/wallet');
    } else {
      setStep(1);
    }
  }, []);


  return (
    <>
      {step === 0 && <><Header hasBack title="Create Wallet" /> <Loader
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
        }}
      />  </>}
      {step === 1 && <WalletInfo setWalletInfo={setWalletInfo} handleNext={handleNext} />}
      {step === 2 && <CustomHandle email={email} password={password} />}
    </>
  );
};

export default CreateWalletScreen;

import React, { useState, useEffect, useCallback, useRef } from "react";
import Button from "../../components/Button";
import { isPwa } from "../../components/AuthLayout";
import WalletCard from "../../components/WalletCard"
import { FormContainer } from "./styles";
import { Title } from "../../components/Header/styles";
import Input from "../../components/Form/Input";
import Header from "../../components/Header";
import useToast from "../../hooks/useToast";
import GenericMessage from "../../components/Toasts/GenericMessage";
import { useHistory } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet"
import WalletService from "services/WalletService";

const SendBSVScreen  = () => {
  const [loading, setLoading] = useState(false);
  const [clickToButton, setClickToButton] = useState(null);
  const [ error , setError ] = useState(null);
  const [ amount , setAmount ] = useState(null);
  const [ address , setAddress ] = useState('');
  const { showToast } = useToast();
  const [ childKey, setChildKey ] = useState(1);
  const { getWallet } = useWallet();
  const history = useHistory();
  const [ deplay, setDeplay ] = useState(0);
  //use to re-render child component
  const increaseChildKey = () => {
    setChildKey(childKey + 1);
  }
  const walletInfo = useRef();

  useEffect(() => {
    const wallet = getWallet();
    if (!wallet) {
      history.push('/wallet/login');
    }
    walletInfo.current = wallet;
  }, []);

  const sendBSV = useCallback( async () => {
    setLoading(true);
    if (amount > 0) {
      const result = await WalletService.sendBSV(walletInfo.current.currentJigPrivateKey, 
        walletInfo.current.currentBsvPrivateKey, address, amount)

      const response = result.data;

      if (response.sent && response.sent.txid) {
        showToast(<GenericMessage text="BSV sent has been successfully " />);
        // after sending bsv we need wait some seconds to call whatonchain api
        // if not we sometimes we won't get newest record
        setDeplay(6000);
        increaseChildKey();
        setAmount('');
        setAddress('');
      } else {
        if ( response === 'invalidAddress' ) {
          setError({address : 'Please specify a Paymail or Address'});
        } else if ( response === 'invalidPaymailAddress' ) {
          setError({address : 'PayMail not found'});
        } else if ( response === 'notEnoughFund' ) {
          setError({amount : 'There is not enough funds'});
        } else if ( response  === 'unexpectedError' ) {
          setError({address : 'An unexpected error has occured'});
        }
      }
    }
    setLoading(false);
  }, [amount, address, increaseChildKey])

  const onAmountChange = (amount) => {
    setError(null);
    setAmount(amount);
  }
  const onAddressChange = (address) => {
    setError(null);
    setAddress(address);
  }

  return (
    <>
      <Header hasBack title={<Title>Send BSV</Title>} />
      <WalletCard key={childKey} hideRecovery={true} deplay={deplay} />
      <FormContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div style={{ width: "80%", marginTop: "30px" }} className="mb-4">
            <Input
              disabled={!!loading}
              placeholder="Enter address or paymail"
              inputClassName="text-left"
              value={address}
              onChange={(val) => onAddressChange(val)}
            />
            {error && error.address && clickToButton && (
              <label style={{ color: "#10a5f5" }} className="mb-5">
                {error.address}
              </label>
            )}
          </div>
          <div style={{ width: "80%"}} className="mb-4">
            <Input
              disabled={!!loading}
              placeholder="$  Enter amount"
              type="number"
              min="0"
              step="0.1"
              value={amount}
              inputClassName="text-left"
              onChange={(val) => onAmountChange(val)}
            />
            {error && error.amount && clickToButton && (
              <label style={{ color: "#10a5f5" }} className="mb-5">
                {error.amount}
              </label>
            )}
          </div>
        </div>
      </FormContainer>
      <Button
        className="primary"
        style={{
          padding: "17px",
          fontSize: "18px",
          width: "80%",
          margin: `60px auto ${
            window.mobileCheck() && !isPwa() ? "75px" : "25px"
          }`
        }}
        onClick={() => {
          setClickToButton(true);
          return loading ? null : sendBSV();
        }}
      >
        Send
      </Button>
    </>
  );

}

export default SendBSVScreen;

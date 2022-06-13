import React, { useState, createRef, useCallback } from "react";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import { isPwa } from "../../components/AuthLayout";
import Header from "../../components/Header";
import { useWallet } from "../../hooks/useWallet"
import { FormContainer } from "../CreateUserScreen/styles";
import WalletService from 'services/WalletService';
import { useHistory } from 'react-router-dom';
import _ from "lodash";

const CustomHandle = ({ email, password }) => {
  const [loading, setLoading] = useState(false);
  const [clickToButton, setClickToButton] = useState(false);
  const [handle, setHandle] = useState('');
  const { createWallet } = useWallet();
  const history = useHistory();
  const fieldError = {};
  const onCreateWallet = useCallback(async () => {
    if (_.isEmpty(fieldError)) {
      setLoading(true);
      const { data: { walletInfo } } = await WalletService.createBSVWallet();
      const data = {email, password, handle, ...walletInfo};
      const status = await createWallet(data);
      if (status) {
        history.push('/nft/wallet');
      }
      setLoading(false);
    }
  }, [email, password, handle, history]);

  return (
    <>
      <Header hasBack title="Create Handle" />
      <FormContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div style={{ width: "80%", marginTop: "150px" }} className="mb-4">
            <Input
              disabled={!!loading}
              onChange={(val) => setHandle(val)}
              placeholder="Create a custom handle"
              inputClassName="text-left"
            />
          </div>
        </div>

        <hr/>

        <Button
          className="primary"
          style={{
            padding: "17px",
            fontSize: "18px",
            width: "80%",
            margin: `0 auto ${
              window.mobileCheck() && !isPwa() ? "350px" : "375px"
            }`
          }}
          onClick={() => {
            setClickToButton(true);
            return loading ? null : onCreateWallet();
          }}
        >
          Create Wallet
        </Button>
      </FormContainer>
    </>
  );

}

export default CustomHandle;

import React, { useState, useCallback, useEffect } from "react";
import Button from "../../components/Button";
import { isPwa } from "../../components/AuthLayout";
import Header from "../../components/Header";
import _ from "lodash";
import Input from "../../components/Form/Input";
import { Title } from "../../components/Header/styles";
import { FormContainer } from "./styles";
import { useWallet } from "../../hooks/useWallet"
import { useHistory } from "react-router-dom";

const WalletLoginScreen  = ({ handleNext, setSeed, navigate, label, showRegister }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [clickToButton, setClickToButton] = useState(false);
  const [error, setError] = useState("");
  const { walletRecovery } = useWallet();
  const onPasswordChange = (value) => {
    setPassword(value);
  };
  const [password, setPassword] = useState("");
  const onGetRecoveryPharse = useCallback(async () => {
    setLoading(true);
    if (password) {
      const encodedPassword = Buffer.from(password).toString('base64');
      const data = await walletRecovery(encodedPassword);
      if (!data) {
        setError("Incorrect password or there are some error occurred")
      } else {
        if (data) {
          if (handleNext) {
            handleNext();
          }

          if (setSeed) {
            setSeed(data.mnemonic);
          }

          if (navigate) {
            history.push(navigate)
          }
        }
      }
    }
    setLoading(false);
  }, [password, setError, walletRecovery, history, navigate]);
  const { getWallet } = useWallet();

  useEffect(() => {
    const wallet = getWallet();
    if (wallet && navigate) {
      return history.push(navigate);
    }
  }, []);

  return (
    <>
      <Header hasBack title={<Title>Unlock Wallet</Title>} />
      <FormContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div style={{ width: "80%", marginTop: "150px" }} className="mb-4">
            <Input
              disabled={!!loading}
              type="password"
              placeholder="Enter wallet password"
              value={password}
              inputClassName="text-left"
              onChange={(val) => onPasswordChange(val)}
            />
            {error && clickToButton && (
              <label style={{ color: "#10a5f5" }} className="mb-5">
                {error}
              </label>
            )}
          </div>
          <Button
            className="primary"
            style={{
              padding: "17px",
              fontSize: "18px",
              width: "80%",
              margin: `200px auto ${window.mobileCheck() && !isPwa() ? "75px" : "25px"
              }`
            }}
            onClick={() => {
              setClickToButton(true);
              return loading ? null : onGetRecoveryPharse();
            }}
          >
            { label ? 
            <>
              {loading && (<i className={"fas fa-spinner fa-spin mr-4"}/>)}
              {label}
            </> 
            : "Next" }
          </Button>

          {
            showRegister && <Button
              style={{
                padding: "17px",
                fontSize: "18px",
                width: "80%",
                margin: `0 auto ${
                  window.mobileCheck() && !isPwa() ? "75px" : "25px"
                }`
              }}
              onClick={() => {
                history.push(`/wallet/create`)
              }}
            >
              Create
            </Button>
          }
        </div>
      </FormContainer>
    </>
  );

}

export default WalletLoginScreen;

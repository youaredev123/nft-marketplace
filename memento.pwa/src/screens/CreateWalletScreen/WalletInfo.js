import React, {useState, useCallback} from "react";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import { isPwa } from "../../components/AuthLayout";
import Header from "../../components/Header";
import { Title } from "../../components/Header/styles";
import checkWalletAuth from "../../lib/checkWalletAuth";
import _ from "lodash";
import { useWallet } from "../../hooks/useWallet"
import {
  FormContainer,
  LabelReminder
} from "./styles";

const WalletInfo = ({handleNext, setWalletInfo}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clickToButton, setClickToButton] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [checkedReminder, setReminder] = useState(false);
  const fieldError = checkWalletAuth(email, confirmEmail, password, confirmPassowrd);
  const { checkWalletEmail } = useWallet();

  const onValidateEmail = useCallback(async () => {
    if (_.isEmpty(fieldError) && _.isEmpty(error) && checkedReminder) {
      setLoading(true);
      const valid = await checkWalletEmail(email);
      if(!valid) {
        setError({email : "Email is already being used"})
      } else {
        setWalletInfo(email, password);
        handleNext();
      }

      setLoading(false);
    }
  }, [email, password, checkedReminder, fieldError, error]);


  const onEmailChange = (value) => {
    if (error.hasOwnProperty('email')) {
      delete error.email;
    }
    setEmail(value);
  };

  const onConfirmEmailChange = (value) => {
    setConfirmEmail(value);
  };

  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const onConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const onCheckReminder = (item) => {
    setReminder(item.target.checked);
  };

  return (
    <>
      <Header hasBack title={<Title>Create Wallet</Title>} />
      <FormContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div style={{ width: "80%", marginTop: "80px" }} className="mb-4">
            <Input
              disabled={!!loading}
              placeholder="Email"
              value={email}
              inputClassName="text-left"
              onChange={(val) => onEmailChange(val)}
            />
            {(fieldError.email || error.email) && clickToButton && (
              <label className="mb-5 error">
                {fieldError.email || error.email}
              </label>
            )}
          </div>
          <div style={{ width: "80%" }} className="mb-4">
            <Input
              disabled={!!loading}
              value={confirmEmail}
              placeholder="Confirm email"
              inputClassName="text-left"
              onChange={(val) => onConfirmEmailChange(val)}
            />
            {(fieldError.confirmEmail || error.confirmEmail ) && clickToButton && (
              <label className="mb-5 error">
                {fieldError.confirmEmail || error.confirmEmail}
              </label>
            )}
          </div>
          <div style={{ width: "80%" }} className="mb-4">
            <Input
              disabled={!!loading}
              value={password}
              type="password"
              placeholder="Password"
              inputClassName="text-left"
              onChange={(val) => onPasswordChange(val)}
            />
            {(fieldError.password || error.password) && clickToButton && (
              <label className="mb-5 error">
                {fieldError.password || error.password}
              </label>
            )}
          </div>
          <div style={{ width: "80%" }} className="mb-4">
            <Input
              disabled={!!loading}
              value={confirmPassowrd}
              type="password"
              placeholder="Confirm password"
              inputClassName="text-left"
              onChange={(val) => onConfirmPasswordChange(val)}
            />
            {(fieldError.confirmPassword || error.confirmPassword) && clickToButton && (
              <label className="mb-5 error">
                {fieldError.confirmPassword || error.confirmPassword}
              </label>
            )}
          </div>
          <div style={{ width: "80%", marginTop : "20px" }} className="form-check mb-4">
            <LabelReminder className="form-check-label" htmlFor="flexCheckDefault">
              <label className="container">
                <input style={{float: 'left', marginRight: '10px'}}  type="checkbox" value={checkedReminder} onChange={(item)=> { onCheckReminder(item) }}/>
                <span className="checkmark"></span>
                I understand that Relica cannot recover this password for me if lost or forgotten.
              </label>
            </LabelReminder>
          </div>

          <hr/>

          <Button
            className="primary"
            style={{
              padding: "17px",
              fontSize: "18px",
              width: "80%",
              margin: `20px auto ${window.mobileCheck() && !isPwa() ? "75px" : "25px"
              }`
            }}
            onClick={() => {
              setClickToButton(true);
              return loading ? null : onValidateEmail();
            }}
          >
            Next
          </Button>
        </div>
      </FormContainer>
    </>
  );
}

export default WalletInfo;

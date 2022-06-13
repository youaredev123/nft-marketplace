import React from 'react';
import {
  Button,
  Buttons,
  CheckBoxContainer,
  ForgotPassword,
  InputContainer,
  LoginContainer,
  LoginText
} from "../styles";
import back from "../../../../assets/images/back.svg";
import Input from "../../../../components/Form/Input";

const Login = ({ checked, setChecked, setShowWalletSelector }) => {
  return (
    <LoginContainer>
      <img src={back} alt="" onClick={() => setShowWalletSelector(false)}/>
      <LoginText>Log in with wallet</LoginText>
      <InputContainer>
        <Input
          name="relica-search"
          onChange={console.log}
          placeholder="Email"
          /*onFocus={() => (props.onFocus ? props.onFocus(true) : null)}
          onBlur={() => (props.onFocus ? props.onFocus(false) : null)}
          value={props.searchTerm}
          clickHandler={props.clickHandler}*/
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="relica-search"
          onChange={console.log}
          placeholder="Password"
          /*onFocus={() => (props.onFocus ? props.onFocus(true) : null)}
          onBlur={() => (props.onFocus ? props.onFocus(false) : null)}
          value={props.searchTerm}
          clickHandler={props.clickHandler}*/
        />
      </InputContainer>

      <CheckBoxContainer>
        <div className="input-group-text d-flex align-items-center">
          <input type="checkbox"
                 checked={checked}
                 onChange={() => setChecked(prev => !prev)}/>

          <div>Remember me</div>
        </div>

        <ForgotPassword to="#">
          Forgot password ?
        </ForgotPassword>
      </CheckBoxContainer>

      <Buttons>
        <Button className="blue">
          <span>Log in</span>
        </Button>
      </Buttons>
    </LoginContainer>
  );
};

export default Login;

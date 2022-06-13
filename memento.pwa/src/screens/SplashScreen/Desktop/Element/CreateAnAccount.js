import React, {useState} from 'react'
import {
  Button,
  Buttons,
  LoginContainer,
  LoginText,
  MyOption,
  MyOptionContent,
  MySelect,
  Text,
  TextContainer
} from "../styles";
import back from "../../../../assets/images/back.svg";
import {ReactComponent as RBC} from "../../../../assets/images/radio-btn-checked.svg";
import {ReactComponent as RBD} from "../../../../assets/images/radio-btn-disable.svg";
import {ReactComponent as HandCash} from "../../../../assets/icons/handcash-icon.svg";
import {ReactComponent as MoneyButton} from "assets/icons/moneybutton-icon.svg";
import {Link} from "react-router-dom";

const CreateAnAccount = ({setShowInfo}) => {
  const [current, setCurrent] = useState(null) // 'Handcash' || 'Moneybutton'

  return (
    <LoginContainer>
      <img src={back} alt="" onClick={() => setShowInfo(false)}/>
      <LoginText>Create an account</LoginText>

      <TextContainer>
        <Text>
          To use Relica will need to create a wallet.
        </Text>
        <Text>
          Your wallet will be paired with your Relica account so you can earn money.
        </Text>
      </TextContainer>

      <Buttons>
        <Button className="blue" onClick={() => window.open("https://app.handcash.io/")}>
          <span>Create a wallet</span>
        </Button>
      </Buttons>
    </LoginContainer>
  )
}

export default CreateAnAccount

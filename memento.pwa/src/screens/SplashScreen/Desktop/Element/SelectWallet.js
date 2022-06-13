import React, { useCallback, useState } from 'react';
import { Button, Buttons, LoginContainer, LoginText, MyOption, MyOptionContent, MySelect } from "../styles";
import back from "../../../../assets/images/back.svg";
import { ReactComponent as RBC } from "../../../../assets/images/radio-btn-checked.svg";
import { ReactComponent as RBD } from "../../../../assets/images/radio-btn-disable.svg";
import { ReactComponent as HandCash } from "assets/icons/handcash-icon.svg";
import { ReactComponent as MoneyButton } from "assets/icons/moneybutton-icon.svg";
import { useMoneyButton } from "hooks/useMoneyButton";
import { useHandCash } from "hooks/useHandCash";

const CreateAnAccount = ({ setShowWalletSelector }) => {
  const [current, setCurrent] = useState(null); // 'Handcash' || 'Moneybutton'
  const { requestAuthorization: requestAuthorizationMB } = useMoneyButton();
  const { authorizationUrl: hcAuthorizationUrl } = useHandCash();

  const redirectHandler = useCallback(() => {
    if (current === 'HandCash') {
      window.location = hcAuthorizationUrl;
    }
    if (current === 'Moneybutton') {
      requestAuthorizationMB();
    }
  }, [current, hcAuthorizationUrl, requestAuthorizationMB]);

  return (
    <LoginContainer>
      <img src={back} alt={""} onClick={() => setShowWalletSelector(false)}/>
      <LoginText>Select wallet</LoginText>

      <MySelect>
        <MyOption onClick={() => setCurrent('HandCash')} active={current === 'HandCash'}>
          <MyOptionContent>
            {current === 'HandCash' ?
              <RBC/> :
              <RBD/>
            }
            <HandCash width={50}/>
            <div>Handcash</div>
          </MyOptionContent>
        </MyOption>

        <MyOption onClick={() => setCurrent('Moneybutton')} active={current === 'Moneybutton'}>
          <MyOptionContent>
            {current === 'Moneybutton' ?
              <RBC/> :
              <RBD/>
            }

            <MoneyButton width={50}/>
            <div>Moneybutton</div>
          </MyOptionContent>
        </MyOption>
      </MySelect>

      <Buttons>
        {current ? (
          <Button className={`blue ${current ? '' : 'disable'}`} onClick={redirectHandler}>
            <span>Continue</span>
          </Button>
        ) : (
          <Button className={`blue ${current ? '' : 'disable'}`}>
            <span>Continue</span>
          </Button>
        )}
      </Buttons>
    </LoginContainer>
  );
};

export default CreateAnAccount;

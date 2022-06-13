import React, { useState } from "react";
import {
  ActionContainer,
  ActionInfo,
  Actions,
  Button,
  Buttons,
  Info,
  InfoContainer,
  InfoLogo,
  InfoText,
} from "./styles";
import bg from '../../../assets/images/AuthBackkground.png';
import bgBig from '../../../assets/images/AuthBackkground@2.png';
import logo from "../../../assets/images/marketing-logo.png";

import Login from "./Element/Login";
import CreateAnAccount from "./Element/CreateAnAccount";
import SelectWallet from "./Element/SelectWallet";
import { DesktopWrapper } from "../../../styles/layout";

const SplashScreenDesktop = (
  {
    showInfo,
    setShowInfo,
    setShowWalletSelector,
    isReferred,
    showReferralOverlay,
    setShowReferralOverlay,
    visibleReferrerName,
    showWalletSelector,
    authorizationUrl
  }
) => {

  const [checked, setChecked] = useState(false);

  return (
    <DesktopWrapper>
      <InfoContainer>
        <img src={bg}
             srcSet={bg + ' 1x,' + bgBig + ' 2x'}
             alt=""/>
        <Info>
          <InfoLogo>
            <img src={logo} alt=""/>
          </InfoLogo>

          <InfoText>
            Post photos. Make money. Maintain ownership
          </InfoText>
        </Info>
      </InfoContainer>

      <ActionContainer>
        <Actions>
          {(!showWalletSelector && !showInfo) && (
            <>
              <ActionInfo>
                <h2>Welcome,</h2>
                <div>How can we help you today?</div>
              </ActionInfo>
              <Buttons>
                <Button onClick={() => setShowWalletSelector(true)}>
                  <span>Login with wallet</span>
                </Button>
                <Button className="blue" onClick={() => setShowInfo(true)}>
                  <span>Create an account</span>
                </Button>
              </Buttons>
            </>
          )}

          {false && (<Login checked={checked} setChecked={setChecked}
                            setShowWalletSelector={setShowWalletSelector}/>)}
          {showInfo && (<CreateAnAccount setShowInfo={setShowInfo}/>)}
          {showWalletSelector && (<SelectWallet setShowWalletSelector={setShowWalletSelector}/>)}

        </Actions>
      </ActionContainer>
    </DesktopWrapper>
  );
};

export default SplashScreenDesktop;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import SelectWalletModal from "../../../components/SelectWalletModal";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLoggedInRedirect } from "../../../hooks/useLoggedInRedirect";
import invitationImg from "../../../assets/images/invitation_blue.jpg";
import { X } from "react-feather";

import {
  LogoName,
  LogoShadow,
  ReferredBlock,
  ReferredHeader,
  ReferredImg,
  ReferredOverlay,
  ReferredParagraph,
  ReferredWrapper,
  SplashContainer,
  SplashHeader,
  SplashParagraph,
  SplashPrompt,
} from "./styles";
import { MobileWrapper } from "styles/layout";

const SplashScreenMobile = (
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
  const { refId } = useParams();
  const [referrerUserId, setReferrerUserId] = useLocalStorage("referrer_user_id", null, false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useLoggedInRedirect();

  if (isReferred && refId !== referrerUserId) {
    setReferrerUserId(refId);
  } else if (!isReferred && referrerUserId) {
    setReferrerUserId(null);
  }

  return (
    <MobileWrapper>
      <SplashContainer>
        <LogoName/>
        {!showInfo ? (
          <LogoShadow/>
        ) : (
          <div>
            <SplashHeader className="mb-5">Create a wallet</SplashHeader>
            <SplashParagraph className="mb-4">
              To use Relica you will need to create a wallet.
            </SplashParagraph>
            <SplashParagraph className="mb-5">
              Your wallet will be paired with your Relica account so
              you can earn money.
            </SplashParagraph>
          </div>
        )}
        {showInfo ? (
          <SplashPrompt>
            <Button
              className="mb-4 primary"
              onClick={() => {
                window.location = authorizationUrl;
              }}
              style={{
                borderRadius: "40px",
                padding: "16px",
                fontSize: "18px",
                background: "white",
                color: "#10a5f5",
              }}
            >
              Create a wallet
            </Button>
            <Button
              className="link"
              onClick={() => setShowInfo(false)}
              style={{ color: "white", fontSize: "18px", paddingBottom: "0" }}
            >
              {/* Back button - X */}
              <X/>
            </Button>
          </SplashPrompt>
        ) : (
          <SplashPrompt>
            <Button
              style={{
                boxShadow: "none",
                fontSize: "18px",
                color: "white",
                paddingTop: "0",
              }}
              className="link"
              onClick={() => setShowInfo(true)}
            >
              Sign up
            </Button>
            <Button
              className="mt-4 primary"
              style={{
                borderRadius: "40px",
                padding: "16px",
                fontSize: "18px",
                background: "white",
                color: "#10a5f5",
              }}
              onClick={() => setShowWalletSelector(true)}
            >
              Login with Wallet
            </Button>
          </SplashPrompt>
        )}
      </SplashContainer>
      {isReferred && showReferralOverlay && (<>
        <ReferredOverlay/>
        <ReferredWrapper onClick={() => setShowReferralOverlay(false)}>
          <ReferredBlock onClick={(e) => e.stopPropagation()}>
            <ReferredHeader>You've been invited!</ReferredHeader>
            <ReferredImg
              src={invitationImg}
              alt="Invitation"/>
            <ReferredParagraph>{visibleReferrerName} has invited you to join Relica,
              the brand new social media platform where you can generate income
              from the photos you post.</ReferredParagraph>
            <Button
              className="primary"
              style={{
                borderRadius: "40px",
                padding: "16px",
                fontSize: "18px",
                background: "white",
                color: "#10a5f5",
                margin: "15px 8px 8px",
                width: "234px"
              }}
              onClick={() => setShowReferralOverlay(false)}
            >
              Join
            </Button>
          </ReferredBlock>
        </ReferredWrapper>
      </>)}
      <SelectWalletModal
        show={isMobile && showWalletSelector}
        onHide={() => setShowWalletSelector(false)}
        isFromSettingsMenu={false}
      />
    </MobileWrapper>
  );
};

export default SplashScreenMobile;

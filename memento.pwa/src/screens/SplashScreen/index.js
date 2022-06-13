import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useHandCash } from "../../hooks/useHandCash";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLoggedInRedirect } from "../../hooks/useLoggedInRedirect";
import SplashScreenMobile from "./Mobile";
import SplashScreenDesktop from "./Desktop";

export default () => {
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const { refId } = useParams();
  const isReferred = !!refId;
  const [showReferralOverlay, setShowReferralOverlay] = useState(true);
  const [referrerUserId, setReferrerUserId] = useLocalStorage("referrer_user_id", null, false);
  const { authorizationUrl } = useHandCash();

  const search = location.search;
  const params = new URLSearchParams(search);
  const refName = params.get("username");

  useLoggedInRedirect();

  if (isReferred && refId !== referrerUserId) {
    setReferrerUserId(refId);
  } else if (!isReferred && referrerUserId) {
    setReferrerUserId(null);
  }

  const visibleReferrerName = refName || "A user";

  return (
    <>
      <SplashScreenDesktop
        showInfo={showInfo}
        showWalletSelector={showWalletSelector}
        isReferred={isReferred}
        setShowInfo={setShowInfo}
        setShowReferralOverlay={setShowReferralOverlay}
        showReferralOverlay={showReferralOverlay}
        setShowWalletSelector={setShowWalletSelector}
        visibleReferrerName={visibleReferrerName}
        authorizationUrl={authorizationUrl}
      />
      <SplashScreenMobile
        showInfo={showInfo}
        showWalletSelector={showWalletSelector}
        isReferred={isReferred}
        setShowInfo={setShowInfo}
        setShowReferralOverlay={setShowReferralOverlay}
        showReferralOverlay={showReferralOverlay}
        setShowWalletSelector={setShowWalletSelector}
        visibleReferrerName={visibleReferrerName}
        authorizationUrl={authorizationUrl}
      />
    </>
  );
};

import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { ReactComponent as CopyIcon } from "assets/icons/Relica_copy.svg";
import { ReactComponent as Twitter } from "assets/icons/Twitter_link.svg";
import invitationImg from "assets/images/invitation_white.png";
import { ReactComponent as BuyForDollar } from "assets/images/$1_button.svg";
import SelectWalletModal from "components/SelectWalletModal";
import SettingsSwitch from "components/SettingsSwitch";
import GenericMessage from "components/Toasts/GenericMessage";
import { useAccount } from "hooks/useAccount";
import useCurrentUser from "hooks/useCurrentUser";
import { useLocalStorage } from "hooks/useLocalStorage";
import useToast from "hooks/useToast";
import { useUserSettings } from "hooks/useUserSettings";
import {
  CopyLink,
  DarkMode,
  InvitationImg,
  InvitationImgWrapper,
  LinkInput,
  NewIcon,
  RouterLink,
  SettingsLayout,
  SettingsLink,
  TwitterLink,
  TwitterText
} from "./styles";
import SettingsItemComponent from "./../SettingsItemComponent";
import { ThemeContext } from "styled-components";
import { DarkModeContext } from "hooks/useDarkMode";
import newIcon from "assets/icons/new.svg";
import { SettingsItem } from "../styles";
import { MobileWrapper } from "styles/layout";

const SettingsScreenMobile = () => {
  const { currentUser } = useCurrentUser();
  const { logout, hydrateUser, walletType } = useAccount();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false); // TODO private profile start value in hardcode
  const [postToTwitter, setPostToTwitter] = useState(false); // TODO private profile start value in hardcode
  const [viewPopUpPrivateProfile, setViewPopUpPrivateProfile] = useState(false); // TODO PoP Up
  const [walletChangeModal, setWalletChangeModal] = useState(false);
  const { oneClickPayments, setOneClickPayments } = useUserSettings();
  const { showToast } = useToast();
  const [addFlow, setAddFlow] = useLocalStorage("login_add_flow", null, true);
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState(false);
  const refPopUp = useRef();
  const themeContext = useContext(ThemeContext);
  const DM = useContext(DarkModeContext);

  useEffect(() => {
    if (addFlow) {
      setAddFlow(false);
      setShouldRedirectToProfile(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setRedirectToLogin(true);
  };

  const handlerChangePostToTwitterStatus = async () => {
    // TODO logic in twitter post
    setPostToTwitter((prev) => !prev);
  };

  const handlerChangePrivateProfile = async () => {
    // TODO handlerChangePrivateProfile
    //console.log(currentUser)

    /*ContentService.changePrivateProfile(true, currentUser.id)// !!!  actual data
      .then((res) => {
        setViewPopUpPrivateProfile(true)
        // setPrivateProfile( actual data )
      })*/

    /// TODO delete this logic

    if (!privateProfile) {
      setViewPopUpPrivateProfile(true);
    }
    setPrivateProfile((prev) => !prev);

    //// delete ^^^^^
  };

  useEffect(() => {
    // hide popup on click outside
    if (viewPopUpPrivateProfile) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [viewPopUpPrivateProfile]);

  function handleClickOutside(e) {
    if (!e.path.includes(refPopUp.current)) {
      setViewPopUpPrivateProfile(false);
    }
  }

  const inviteLink =
    currentUser &&
    window.location.origin +
    "/join/" +
    encodeURIComponent(currentUser.id) +
    "?username=" +
    encodeURIComponent(currentUser.username);
  const twitterText = encodeURIComponent(
    "Post photos. Make money. Maintain ownership.\n\n" +
    "Join the @Relicaworld revolution and experience an exciting new photo sharing platform built on #Bitcoin" +
    " where you generate income from your content.\n\n" +
    "#Relica #BSV #Bitcoin #Photos 📸🌎🌸"
  );

  /*const buttonClick = () => {
    addNotification({
      title: 'Relica',
      subtitle: 'This is a subtitle',
      message: 'PeterGec liked your picture!',
      theme: 'darkblue',
      native: true, // when using native, your OS will handle theming.
      icon: 'https://imgur.com/YpzhAzC.png',
      backgroundBottom: '#000000',
    });
  };*/

  return (
    <MobileWrapper>
      <SettingsLayout>
        <div style={{ textAlign: "center" }}>
          {walletType === "moneybutton" && (
            <SettingsItemComponent
              text="One-click Payments"
              handler={() => setOneClickPayments(!oneClickPayments)}
              status={oneClickPayments}
            />
          )}
          <SettingsItem>
            <span>Dark Mode</span>
            {!DM.darkModePurchased ? (
              <DarkMode>
                <BuyForDollar onClick={DM.handlerBuyDarkMode}/>
              </DarkMode>
            ) : (
              <SettingsSwitch
                on={DM.darkMode}
                onClick={() => DM.setDarkMode(!DM.darkMode)}
              />
            )}
          </SettingsItem>
          <SettingsItem>
            <RouterLink to="/settings/exclusivity" color={themeContext.text}>
              Pay-to-View
              <NewIcon src={newIcon} alt="New"/>
            </RouterLink>
          </SettingsItem>
          <SettingsItem>
            <SettingsLink
              color={themeContext.text}
              onClick={() => {
                hydrateUser();
                setWalletChangeModal(true);
              }}
            >
              Select Wallet
            </SettingsLink>
          </SettingsItem>
          <SettingsItem>
            <SettingsLink
              color={themeContext.text}
              target="_blank"
              href="/privacypolicy.html"
            >
              Privacy Policy
            </SettingsLink>
          </SettingsItem>
          <SettingsItem>
            <SettingsLink
              color={themeContext.text}
              target="_blank"
              href="/terms.html"
            >
              Terms &amp; Conditions
            </SettingsLink>
          </SettingsItem>
          <SettingsItem>
            <SettingsLink href="https://twitter.com/relicaworld">
              Visit our Twitter page
            </SettingsLink>
          </SettingsItem>
          <SettingsItem>
            <SettingsLink color="var(--red)" onClick={handleLogout} href="#">
              Log out
            </SettingsLink>
          </SettingsItem>
          {currentUser && (
            <>
              <InvitationImgWrapper>
                <InvitationImg src={invitationImg} alt="Invitation"/>
              </InvitationImgWrapper>
              <TwitterText>
                <TwitterLink
                  href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(
                    inviteLink
                  )}`}
                >
                  <Twitter width={70} height={20}/>
                </TwitterLink>
                <br/>
                Invite friends with your link!
                <br/>
                Be rewarded referral bonuses whenever they earn.
              </TwitterText>
              <SettingsItem>
                <CopyLink>
                  <CopyIcon
                    onClick={() => {
                      window.navigator.clipboard.writeText(inviteLink);
                      showToast(<GenericMessage text="Copied to clipboard"/>);
                    }}
                  />
                  <LinkInput
                    readOnly={true}
                    onBlur={(e) => {
                      const input = e.target;
                      input.scrollLeft = 0;
                    }}
                    value={inviteLink}
                  />
                </CopyLink>
              </SettingsItem>
            </>
          )}
        </div>
        <SettingsItem
          style={{
            display: "flex",
            flexDirection: "column",
            color: "var(--blue)",
            fontWeight: "var(--font-weight-light)"
          }}
        >
          <p style={{ fontSize: "1.5rem", margin: "0px 0 60px 0" }}>
            © 2021 Relica Pty Ltd. All rights reserved.
          </p>
        </SettingsItem>
        {redirectToLogin && <Redirect to="/"/>}
      </SettingsLayout>
      <SelectWalletModal
        show={walletChangeModal}
        onHide={() => setWalletChangeModal(false)}
        isFromSettingsMenu={true}
      />
    </MobileWrapper>
  );
};

export default SettingsScreenMobile;

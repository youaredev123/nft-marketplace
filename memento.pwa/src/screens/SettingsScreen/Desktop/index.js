import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsSwitch from "components/SettingsSwitch";
import { useAccount } from "hooks/useAccount";
import useCurrentUser from "hooks/useCurrentUser";
import { useLocalStorage } from "hooks/useLocalStorage";
import useToast from "hooks/useToast";
import { useUserSettings } from "hooks/useUserSettings";

import {
  DesktopWrapper,
  SettingBar,
  SettingContainer,
  SettingsItem,
  SettingsLayout,
  SettingsLink, ShadowBox,
  TabContent
} from "./styles";
import { ThemeContext } from "styled-components";
import useProfile from "hooks/useProfile";
import { NewIcon } from "../Mobile/styles";
import newIcon from "assets/icons/new.svg";
import EditProfileTab from "screens/SettingsScreen/Desktop/Tab/EditProfileTab";
import DarkModeTab from "screens/SettingsScreen/Desktop/Tab/DarkModeTab";
import SelectWalletTab from "screens/SettingsScreen/Desktop/Tab/SelectWalletTab";
import ExclusivityScreen from "screens/ExclusivityScreen";
import InvitationTab from "screens/SettingsScreen/Desktop/Tab/InvitationTab";
import { DARK_MODE, EDIT_PROFILE, INVITATION, PAY_TO_VIEW, SELECT_WALLET } from "screens/SettingsScreen/constants";

const SettingsScreenDesktop = ({ initActiveTab = EDIT_PROFILE, purchasedPrivate }) => {
  const { currentUser } = useCurrentUser();
  const { logout, hydrateUser, walletType } = useAccount();
  const { fetchProfileById } = useProfile();
  const [activeTab, setActiveTab] = useState(initActiveTab);

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

  useEffect(() => {
    if (addFlow) {
      setAddFlow(false);
      setShouldRedirectToProfile(true);
    }
  }, []);

  useEffect(() => { // hide popup on click outside
    if (viewPopUpPrivateProfile) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [viewPopUpPrivateProfile]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setRedirectToLogin(true);
  };

  const handlerChangePostToTwitterStatus = async () => { // TODO logic in twitter post
    setPostToTwitter(prev => !prev);
  };

  const handlerChangePrivateProfile = async () => { // TODO handlerChangePrivateProfile
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
    setPrivateProfile(prev => !prev);

    //// delete
  };

  function handleClickOutside(e) {
    if (!e.path.includes(refPopUp.current)) {
      setViewPopUpPrivateProfile(false);
    }
  }

  const inviteLink = currentUser && window.location.origin + "/join/" + encodeURIComponent(currentUser.id)
    + "?username=" + encodeURIComponent(currentUser.username);
  const twitterText = encodeURIComponent(
    "Post photos. Make money. Maintain ownership.\n\n" +
    "Join the @Relicaworld revolution and experience an exciting new photo sharing platform built on #Bitcoin" +
    " where you generate income from your content.\n\n" +
    "#Relica #BSV #Bitcoin #Photos 📸🌎🌸");

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

  const displayTabContent = () => {
    switch (activeTab) {
      case DARK_MODE:
        return (
          <DarkModeTab>
          </DarkModeTab>
        );

      case PAY_TO_VIEW:
        return (
          <ExclusivityScreen purchasedPrivate={purchasedPrivate} color={themeContext.text} showMobile={false}>
          </ExclusivityScreen>
        );

      case SELECT_WALLET:
        return (
          <SelectWalletTab isFromSettingsMenu={true}>
          </SelectWalletTab>
        );

      case INVITATION:
        return (
          <InvitationTab currentUser={currentUser}>
          </InvitationTab>
        );

      case EDIT_PROFILE:
      default:
        return (
          <EditProfileTab>
          </EditProfileTab>
        );
    }
  };

  return (
    <DesktopWrapper className={"row"}>
      <div className={"col-4 d-none d-sm-block p-0"}>
        <SettingsLayout>
          <SettingContainer>
            <SettingBar>
              <SettingsItem
                className={`${EDIT_PROFILE === activeTab ? 'active' : ''}`}
                onClick={_ => setActiveTab(EDIT_PROFILE)}
              >
                <span>Edit Profile</span>
              </SettingsItem>

              {walletType === "moneybutton" && (
                <SettingsItem>
                  <span>One-click payments</span>
                  <SettingsSwitch on={oneClickPayments} onClick={() => setOneClickPayments(!oneClickPayments)}/>
                </SettingsItem>
              )}

              <SettingsItem
                className={`${DARK_MODE === activeTab ? 'active' : ''}`}
                onClick={_ => setActiveTab(DARK_MODE)}
              >
                <span>Dark Mode</span>
              </SettingsItem>

              <SettingsItem
                className={`${PAY_TO_VIEW === activeTab ? 'active' : ''}`}
                onClick={_ => setActiveTab(PAY_TO_VIEW)}
              >
                <span>Pay-to-View <NewIcon src={newIcon} alt="New"/></span>
              </SettingsItem>

              <SettingsItem
                className={`${SELECT_WALLET === activeTab ? 'active' : ''}`}
                onClick={_ => setActiveTab(SELECT_WALLET)}
              >
                <span>Select Wallet</span>
              </SettingsItem>

              <SettingsItem
                className={`${INVITATION === activeTab ? 'active' : ''}`}
                onClick={_ => setActiveTab(INVITATION)}
              >
                <span>Invitation</span>
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
            </SettingBar>
          </SettingContainer>
        </SettingsLayout>
      </div>
      <div className={"col-12 col-sm-8 p-0"}>
        <ShadowBox>
          <TabContent>
            {displayTabContent()}
          </TabContent>
        </ShadowBox>
      </div>
    </DesktopWrapper>
  );
};

export default SettingsScreenDesktop;

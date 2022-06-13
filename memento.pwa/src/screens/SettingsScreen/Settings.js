import PopUpSuccessChangePrivateAccount from "screens/SettingsScreen/PopUpSuccessChangePrivateAccount";
import Header from "components/Header";
import { Title } from "components/Header/Mobile/styles";
import React, {useContext, useRef, useState} from "react";
import useCurrentUser from "hooks/useCurrentUser";
import SettingsScreenDesktop from "screens/SettingsScreen/Desktop";
import SettingsScreenMobile from "screens/SettingsScreen/Mobile";
import { EDIT_PROFILE } from "screens/SettingsScreen/constants";
import {ThemeContext} from "styled-components";

const Settings = ({ initActiveTab = EDIT_PROFILE, purchasedPrivate }) => {
  const { currentUser } = useCurrentUser();
  const [viewPopUpPrivateProfile, setViewPopUpPrivateProfile] = useState(false); // TODO PoP Up
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState(false);
  const refPopUp = useRef();
  const themeContext = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  return (
    <>
      {viewPopUpPrivateProfile &&
      <PopUpSuccessChangePrivateAccount hide={setViewPopUpPrivateProfile} refPopUp={refPopUp}/>}
      <div className={"container-fluid"} style={{backgroundColor: !isMobile ? themeContext.backgroundBoxColor : "inherit", height: "100%"}}>
        <div className={"row"}>
          <Header
            title={<Title>Settings</Title>}
            hasBack
            backAddressOverride={shouldRedirectToProfile ? ("/" + encodeURIComponent(currentUser.username)) : null}
          />
        </div>
        <div>
          <SettingsScreenDesktop initActiveTab={initActiveTab} purchasedPrivate={purchasedPrivate} />
          <SettingsScreenMobile />
        </div>
      </div>
    </>
  )
}

export default Settings;

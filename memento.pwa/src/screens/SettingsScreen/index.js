import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ExclusivityScreen from "../ExclusivityScreen";
import UserService from "../../services/UserService";
import Settings from "screens/SettingsScreen/Settings";
import { DARK_MODE, INVITATION, SELECT_WALLET } from "screens/SettingsScreen/constants";
import { DesktopWrapper, MobileWrapper } from "styles/layout";

const SettingsScreen = () => {
  const location = useLocation();
  const [purchasedPrivate, setPurchasedPrivate] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      let response = await UserService.myProfile();
      if (response && response.data && response.data.purchases) {
        setPurchasedPrivate(response.data.purchases.privateAccount);
      }
    }

    fetchProfile();
  }, []);

  return (
    <Switch location={location} key={location.pathname}>
      <Route path="/settings" exact>
        <Settings purchasedPrivate={purchasedPrivate}/>
      </Route>
      <Route path={`/settings/${DARK_MODE}`} exact>
        <Settings initActiveTab={DARK_MODE}/>
      </Route>
      <Route path="/settings/exclusivity" exact>
        <DesktopWrapper>
          <Settings initActiveTab={"pay-to-view"} purchasedPrivate={purchasedPrivate}/>
        </DesktopWrapper>
        <ExclusivityScreen purchasedPrivate={purchasedPrivate} showDesktop={false}/>
      </Route>
      <Route path={`/settings/${SELECT_WALLET}`} exact>
        <Settings initActiveTab={SELECT_WALLET}/>
      </Route>
      <Route path={`/settings/${INVITATION}`} exact>
        <Settings initActiveTab={INVITATION}/>
      </Route>
    </Switch>
  );
};

export default SettingsScreen;

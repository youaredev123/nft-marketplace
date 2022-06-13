import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import WalletScreen from "./Wallet/WalletScreen";
import { TabContainer, TabContent, TabNavigation, TabNavLink } from "./styles";
import SatchelScreen from "./Satchel/SatchelScreen";
import MarketScreen from "./Market/MarketScreen";
import DesktopLayout from "layouts/Desktop/DesktopLayout";

export default () => {
  const location = useLocation();

  return (
    <>
      <DesktopLayout withSidebar={false} hideBorder={true}>
        <TabContainer>
          <TabNavigation>
            <TabNavLink
              className="firstLink"
              activeClassName="active"
              to="/nft/wallet"
              exact
            >
              Wallet
            </TabNavLink>
            <TabNavLink
              className="secondLink"
              activeClassName="active"
              to="/nft/satchel"
            >
              Minted NFTs
            </TabNavLink>
            <TabNavLink
              className="thirdLink"
              activeClassName="active"
              to="/nft/market"
            >
              Market
            </TabNavLink>
          </TabNavigation>
          <TabContent>
            <Switch location={location} key={location.pathname}>
              <Route path="/nft/wallet" exact>
                <WalletScreen />
              </Route>
              <Route path="/nft/satchel" exact>
                <SatchelScreen />
              </Route>
              <Route path="/nft/market" exact>
                <MarketScreen />
              </Route>
              <Route path="/nft/wallet/send" exact>
                <div style={{ textAlign: 'center', marginTop: "50px" }}>Under Construction</div>
              </Route>
            </Switch>
          </TabContent>
        </TabContainer>
      </DesktopLayout>
    </>
  );
};

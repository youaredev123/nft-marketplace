import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivityScreen from "../ActivityScreen";
import IncomeScreen from "../IncomeScreen";
import { DesktopWrapper, TabContainer, TabContent, TabNavigation, TabNavLink } from "./styles";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import usePostModal from "hooks/usePostModal";

const NotificationScreen = () => {
  const location = useLocation();
  const { viewPost, renderModal } = usePostModal();

  return (
    <>
      <DesktopLayout hideHeaderMobile={true} withSidebar={false} hideBorder={true}>
        <DesktopWrapper>
          <h3>Income</h3>
        </DesktopWrapper>
        <TabContainer>
          <TabNavigation>
            <TabNavLink
              className="firstLink"
              activeClassName="active"
              to="/notifications"
              exact
            >
              Activity Log
            </TabNavLink>
            <TabNavLink
              className="secondLink"
              activeClassName="active"
              to="/notifications/income"
            >
              Income
            </TabNavLink>
          </TabNavigation>
          <TabContent>
            <Switch location={location} key={location.pathname}>
              <Route path="/notifications" exact>
                <ActivityScreen viewPost={viewPost} />
              </Route>
              <Route path="/notifications/income" exact>
                <IncomeScreen viewPost={viewPost} />
              </Route>
            </Switch>
          </TabContent>
        </TabContainer>
      </DesktopLayout>
      {renderModal()}
    </>
  );
};

export default NotificationScreen;

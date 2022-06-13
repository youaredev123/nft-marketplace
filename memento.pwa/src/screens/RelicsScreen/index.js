import React, { useCallback } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useLocalStorage } from "hooks/useLocalStorage";
import {
  ContentWrapper,
  FilterElem,
  FilterElemActive,
  Heading,
  InnerContainer,
  OuterContainer,
  SelectBar,
  TopBar,
} from "./styles";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import Dug from "./Dug";
import Map from "./Map";
import AgreeTermAndCondition from "./AgreeTermAndCondition";

import "./styles.scss";

export default () => {
  const history = useHistory();
  const location = useLocation();
  const [account, setAccount] = useLocalStorage("relica_user", null);
  const enableTermAndConditionScreen = !(account.purchases?.relicTcs ?? false);

  const switchTabToMap = useCallback(() => {
    history.push("/relics");
  }, [history]);
  const switchTabToDug = useCallback(() => {
    history.push("/relics/discovered");
  }, [history]);
  const switchTabToBuried = useCallback(() => {
    history.push("/relics/buried");
  }, [history]);

  const path = location.pathname.split("/");
  let place = 0;
  switch (path.pop()) {
    case "discovered":
      place = 1;
      break;
    // case "buried":
    //   place = 2;
    //   break;
  }

  return (
    <DesktopLayout hideHeaderMobile className={place === 0 ? 'relics-screen map-screen' : 'relics-screen'} withSidebar={false} hideBorder={true}>
      {place === 1 ? <Heading>Discovered Relics</Heading> : null}
      <ContentWrapper>
        <OuterContainer>
          {enableTermAndConditionScreen ? null :
            <TopBar>
              <SelectBar place={place}>
                <FilterElem>
                  {place === 0 ?
                    <FilterElemActive>Map</FilterElemActive> :
                    <div onClick={switchTabToMap}>Map</div>
                  }
                </FilterElem>
                <FilterElem>
                  {place === 1 ?
                    <FilterElemActive>Discovered</FilterElemActive> :
                    <div onClick={switchTabToDug}>Discovered</div>
                  }
                </FilterElem>
                {/*
              <FilterElem>
                {place === 2 ?
                    <FilterElemActive>Hidden</FilterElemActive> :
                    <div onClick={switchTabToBuried}>Hidden</div>
                }
              </FilterElem>
              */}
              </SelectBar>
            </TopBar>
          }
          <InnerContainer>
            <Switch location={location} key={location.pathname}>
              <Route path="/relics" exact>
                {enableTermAndConditionScreen ? <AgreeTermAndCondition/> : <Map/>}
              </Route>
              <Route path="/relics/discovered" exact>
                <Dug/>
              </Route>
              {
                /*
              <Route path="/relics/buried" exact>
                <BuriedScreen />
              </Route>
                 */
              }
            </Switch>
          </InnerContainer>
        </OuterContainer>
      </ContentWrapper>
    </DesktopLayout>
  );
};

import Header from "components/Header";
import React, {useCallback, useContext} from "react";
import {BodyWrapper, ShadowBox} from "./styles";
import Sidebar from "components/Sidebar";
import {ThemeContext} from "styled-components";

  const DesktopLayout = (
  {
    children,
    headerTitle,
    className = '',
    headerHasBack = false,
    hasBlackBackground = false,
    withSidebar = true,
    hideHeaderDesktop = false,
    hideHeaderMobile = false,
    hideBorder = false
  }
) => {
  const displaySidebar = useCallback(() => {
    if (!withSidebar) {
      return null;
    }

    return (
      <div className={"col-4 d-none d-sm-block p-0"}>
        <Sidebar/>
      </div>
    );
  }, [withSidebar]);

  const mainContentClasses = useCallback(() => {
    if (!withSidebar) {
      return "col-12 p-0" + (hasBlackBackground ? " black-bg" : "");
    }

    return "col-12 col-sm-8 p-0" + (hasBlackBackground ? " black-bg" : "");
  }, [withSidebar]);

  return (
    <div style={{ height: "100%" }} className={className}>
      <div className={"container-fluid"}>
        <div className={"row row-header"}>
          <Header hasBack={headerHasBack} title={headerTitle} hideDesktop={hideHeaderDesktop} hideMobile={hideHeaderMobile}/>
        </div>
        <BodyWrapper className={"row"}>
          {displaySidebar()}
          <div className={mainContentClasses()}>
            <ShadowBox hideBorder={hideBorder}>
              {children}
            </ShadowBox>
          </div>
        </BodyWrapper>
      </div>
    </div>
  );
};

export default DesktopLayout;

import React from "react";
import HeaderMobile from "./Mobile";
import HeaderDesktop from "./Desktop";
import useWindowDimensions from "hooks/useWindowWidth";

const Header = (
  {
    title,
    hasBack,
    titleOnly,
    isMarketDetail,
    hasCreateCollectionButton,
    hasRemoveRelicOption,
    backFunction,
    backTitle = "Back",
    backAddressOverride,
    backAddressDefault,
    newChatCallBack,
    profilePic,
    spacer,
    isMyPost,
    isFilled,
    inPostScreen = false,
    hideMobile = false,
    hideDesktop = false
  }
) => {
  const { windowWidth } = useWindowDimensions();

  return (
    <>
      {!hideDesktop && windowWidth > 480 && (
        <HeaderDesktop/>
      )}
      {!hideMobile && windowWidth <= 480 && (
        <HeaderMobile
          title={title}
          hasBack={hasBack}
          inPostScreen={inPostScreen}
          isMyPost={isMyPost}
          spacer={spacer}
          profilePic={profilePic}
          newChatCallBack={newChatCallBack}
          backAddressDefault={backAddressDefault}
          backAddressOverride={backAddressOverride}
          backTitle={backTitle}
          backFunction={backFunction}
          hasRemoveRelicOption={hasRemoveRelicOption}
          hasCreateCollectionButton={hasCreateCollectionButton}
          isFilled={isFilled}
          isMarketDetail={isMarketDetail}
          titleOnly={titleOnly}
        />
      )}
    </>
  );
};

export default Header;

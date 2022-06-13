import React, { useCallback, useContext, useMemo, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as LeftArrow } from "assets/icons/left-arrow2.svg";
import { ReactComponent as ThreeDots } from "assets/icons/three-dots.svg";
import { ReactComponent as NewMessage } from "assets/icons/new-message.svg";
import LogoIcon from "assets/images/relica-word.svg";
import LogoIconDM from "assets/images/relica-word_white.svg";
import leaderboardIcon from "assets/icons/leaderboard.svg";
import globIcon from "assets/icons/world-icon.png";
import marketPlaceIcon from "assets/icons/market-place-icon.svg";
import walletIcon from "assets/icons/wallet.svg";
import Avatar from "components/Avatar";
import { capitalize } from "lib/utils";
import {
  BackButton,
  GlobeIcon,
  MarketPlaceIcon,
  WalletIcon,
  HeaderContainer,
  HeaderSpace,
  Leaderboard,
  IconWrapper,
  LogoContainer,
  LogoWrapper,
  Title,
  TitleContainer,
  CreateCollectionBtn,
  SaleAndSoldLabel
} from "./styles";
import { ThemeContext } from "styled-components";
import { DarkModeContext } from "hooks/useDarkMode";
import { PostButton } from "screens/RelicsScreen/styles";
import RelicService from "../../../services/RelicService";
import { useParams } from "react-router";
import Spinner from "../../Loader";
import { useLocalStorage } from "hooks/useLocalStorage";
import ContentService from "services/ContentService";

const HeaderMobile = (
  {
    title,
    hasBack,
    hasRemoveRelicOption,
    hasCreateCollectionButton,
    backFunction,
    backTitle = "Back",
    backAddressOverride,
    backAddressDefault,
    newChatCallBack,
    profilePic,
    spacer,
    isMyPost,
    inPostScreen = false,
    isMarketDetail,
    isFilled
  }
) => {
  const themeContext = useContext(ThemeContext);
  const theme = useContext(DarkModeContext);
  const history = useHistory();
  const isHome = history.location.pathname === "/";
  const backTitleBasedOnLocation = capitalize(
    history.location.pathname.split("/")[1]
  );
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [showLoadingRemove, setShowLoadingRemove] = useState(false);
  const [showHidePostButton, setShowHidePostButton] = useState(false);
  const [showLoadingHidePost, setShowLoadingHidePost] = useState(false);
  const [account, setAccount] = useLocalStorage("relica_user", null);
  const { id } = useParams();

  const back = () => {
    if (backFunction) {
      backFunction();
    }

    if (backAddressOverride) {
      history.push(backAddressOverride);
    } else if (history.length > 1) {
      history.goBack();
    } else if (backAddressDefault) {
      history.push(backAddressDefault);
    }
  };

  const createCollection = () => {
    history.push(`/nft/select`);
  }

  const renderRemoveButton = () => {
    return showRemoveButton ?
      (<PostButton
        style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 6px" }}
        onClick={onRemoveClick}
        className="primary remove-relic-btn"
      >
        {showLoadingRemove ? <Spinner color="white" size={20}/> : 'Remove'}
      </PostButton>)
      : null;
  };

  const renderHidePostButton = () => {
    return showHidePostButton ?
      (<PostButton
        style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 6px" }}
        onClick={onHidePostClick}
        className="primary remove-relic-btn"
      >
        {showLoadingHidePost ? <Spinner color="white" size={20}/> : 'Hide post'}
      </PostButton>)
      : null;
  };

  const onRemoveClick = useCallback(() => {
    (async () => {
      setShowLoadingRemove(true);

      const transactionResultResponse = await RelicService.unlockMyRelicAndCreateTransaction({
        relicId: id,
      });

      if (transactionResultResponse.status === 200) {
        window.location.href = "/relics";
      } else {
        alert("Failed to remove relic: " + transactionResultResponse.status + " " + JSON.stringify(transactionResultResponse.data));
      }

      setShowLoadingRemove(false);
    })();
  }, [showLoadingRemove]);

  const onHidePostClick = useCallback(() => {
    (async () => {
      setShowLoadingHidePost(true);

      ContentService.hidePicture(id)
        .then(() => {
          window.location.href = `/${account.username}`;
        });

      setShowLoadingHidePost(false);
    })();
  }, [showLoadingHidePost]);

  const MenuInPost = useMemo(() => {
    if (backTitleBasedOnLocation === "Post" && isMyPost) {
      return (<>
          <ThreeDots className="option-menu"
                     strokeWidth={1.5}
                     color="var(--grey)"
                     size={32}
                     onClick={() => setShowHidePostButton(!showHidePostButton)}
          />
          {renderHidePostButton()}
        </>
      );
    }
  }, [backTitleBasedOnLocation, isMyPost, showHidePostButton]);

  const Logo = useMemo(() => {
    const style = {
      width: 70,
      height: 30,
      strokeWidth: 2,
      color: themeContext.navIconColorMuted
    };

    return (
      <>
        {isHome && (
          <LogoContainer>
            <>
              <LogoWrapper>
                <img src={theme.darkMode ? LogoIconDM : LogoIcon} {...style} alt={"Relica"}/>
              </LogoWrapper>
              <IconWrapper>
                <NavLink to="/nft/wallet">
                  <WalletIcon src={walletIcon} alt="Wallet" />
                </NavLink>
                <NavLink to="/nft/market">
                  <MarketPlaceIcon src={marketPlaceIcon} alt="Market Place" />
                </NavLink>
                <NavLink to="/leaderboard">
                  <Leaderboard src={leaderboardIcon} alt="Leaderboard"/>
                </NavLink>
              </IconWrapper>
            </>
          </LogoContainer>
        )}
      </>
    );
  }, [theme.darkMode, isHome]);

  const globeIcon = useCallback(() => {
    const style = {
      width: 27,
      height: 28,
      strokeWidth: 2,
      color: themeContext.navIconColorMuted
    };
    return (
      <>
        <NavLink to="/relics">
          <GlobeIcon src={globIcon} alt="Map" {...style} />
        </NavLink>
      </>
    );
  }, [themeContext]);

  return (
    <>
      <HeaderContainer>
        <TitleContainer isHome={isHome}>
          {Logo}
          {hasBack ? (
            <>
              <LeftArrow
                strokeWidth={1.5}
                color="var(--grey)"
                size={32}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={back}
              />
              {!profilePic && (
                <Title onClick={back} style={{ cursor: "pointer" }}>
                  {title || backTitleBasedOnLocation || backTitle}
                </Title>
              )}
              {profilePic && (
                <Avatar
                  url={profilePic}
                  height={30}
                  width={30}
                  className="mr-3"
                />
              )}
              {profilePic && (
                <Title style={{ marginTop: "4px" }}>{backTitle}</Title>
              )}
            </>
          ) : null}

          {hasRemoveRelicOption ? (
            <>
              <ThreeDots className="option-menu"
                         strokeWidth={1.5}
                         color="var(--grey)"
                         size={32}
                         onClick={() => setShowRemoveButton(!showRemoveButton)}
              />

              {renderRemoveButton()}
            </>
          ) : null}

          {MenuInPost}
        </TitleContainer>
        {isHome && globeIcon()}

        {spacer && <div></div>}
        {newChatCallBack && (
          <TitleContainer>
            <BackButton onClick={() => newChatCallBack()} className="mr-2">
              <NewMessage
                className={"nav-black-home"}
                style={{ maxWidth: "22px", maxHeight: "22px" }}
              />
            </BackButton>
          </TitleContainer>
        )}

        { hasCreateCollectionButton ? (
            <CreateCollectionBtn onClick={() => createCollection()}>
              Create Collection
            </CreateCollectionBtn>
        ) : null }

        { isMarketDetail ? isFilled ?
          <SaleAndSoldLabel>
            Sold
          </SaleAndSoldLabel> :
          <SaleAndSoldLabel>
            Sale
          </SaleAndSoldLabel>
          : null }

      </HeaderContainer>
      <HeaderSpace inPostScreen={inPostScreen}>
      </HeaderSpace>
    </>
  );
};

export default HeaderMobile;

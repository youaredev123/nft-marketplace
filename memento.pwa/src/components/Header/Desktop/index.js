import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import {
  Activity,
  Button,
  ButtonLink,
  Header,
  HeaderHide,
  HeaderSearch,
  HeaderSpace,
  HeaderWrapper,
  Input,
  InputWrapper,
  LinkToProfile,
  LinkToSettings,
  LogOut,
  UserMenu,
  MarketPlaceIcon
} from "./style";
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as SearchIconNav } from 'assets/icons/searchNav.svg';
import { ReactComponent as NotificationIcon } from 'assets/icons/alarm.svg';
import PlaceHolderAvatar from 'assets/images/avatar-placeholder.png';
import marketPlaceIcon from "assets/icons/market-place-icon.svg";
import { ReactComponent as RelicaLogo } from "assets/images/relica-word.svg";
import { ReactComponent as RelicaLogoDarkMode } from "assets/images/relica-word_white.svg";
import useCurrentUser from "hooks/useCurrentUser";
import { useAccount } from "hooks/useAccount";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ReactComponent as NotificationIconDot } from "assets/icons/Notification-dot.svg";
import useNotification from "hooks/useNotification";
import { DarkModeContext } from "hooks/useDarkMode";
import { ThemeContext } from "styled-components";
import queryString from "query-string";
import CreatePostModal from "components/Header/Desktop/CreatePostModal";
import { GlobeIcon } from "components/Header/Mobile/styles";
import globIcon from "assets/icons/world-icon.png";

const HeaderDesktop = () => {
  const history = useHistory();
  const DM = useContext(DarkModeContext);
  const themeContext = useContext(ThemeContext);
  const { currentUser } = useCurrentUser();
  const refInput = createRef();
  const { notificationUnseen } = useNotification();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const onHideHandler = useCallback(() => setShowCreateModal(false), [setShowCreateModal]);

  useEffect(() => {
    if (!refInput && !refInput.current) {
      return;
    }

    const params = queryString.parse(window.location.search);
    refInput.current.value = params.searchTerm || '';
  }, [refInput]);

  const [isMenuOpen, toggleMenu] = useState(false);
  const clickHandler = () => {
    toggleMenu(!isMenuOpen);
  };

  const focusInInput = () => {
    refInput.current.focus();
  };
  const onSearchTermChange = (e) => {
    if (e.key === 'Enter') {
      history.push(
        `search?searchTerm=${refInput.current.value}&searchType=users`,
        { searchTerm: refInput.current.value, searchType: 'users', filterType: null }
      );
    }
  };
  const { logout } = useAccount();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setRedirectToLogin(true);
  };

  const currentUserProfileLink = "/" + (
    currentUser !== null
      ? encodeURIComponent(currentUser.username)
      : "");

  const currentUserSettingLink = "/settings";

  const [style, setStyle] = useState({ opacity: 0 });
  useEffect(() => {
    setStyle({ opacity: +!!isMenuOpen });
  }, [isMenuOpen]);

  const displayLogo = useCallback(() => {
    if (DM.darkMode) {
      return (
        <>
          <RelicaLogoDarkMode
            width={80}
            height={40}
            strokeWidth={2}
            fill="none"
            color={themeContext.bgcIcon}
          />
        </>
      );
    }

    return (
      <>
        <RelicaLogo
          width={80}
          height={40}
          strokeWidth={2}
          fill="none"
          color={themeContext.bgcIcon}
        />
      </>
    );
  }, [DM, DM.darkMode]);

  const displayAvatar = useCallback(() => {
    return currentUser?.profilePic ?
      (<img src={currentUser.profilePic} id="avatar" alt="avatar" />) :
      (<img src={PlaceHolderAvatar} id="avatar" alt="avatar" />);
  }, [currentUser?.profilePic]);

  const globeIcon = useCallback(() => {
    const style = {
      width: 27,
      height: 28,
      strokeWidth: 2,
      color: themeContext.navIconColorMuted
    };
    return (
      <NavLink to="/relics">
        <GlobeIcon src={globIcon} alt="Map" {...style} />
      </NavLink>
    );
  }, [themeContext]);

  return (
    <HeaderHide>
      <HeaderWrapper>
        <Header style={{ padding: "0", maxWidth: "1000px", margin: "0 auto" }}>
          <HeaderSearch>
            <Link className={"logo"} to={"/"}>
              {displayLogo()}
            </Link>
            <InputWrapper className={"input-search-wrapper"} onClick={focusInInput}>
              <SearchIcon />
              <Input
                type="text"
                ref={refInput}
                onKeyUp={onSearchTermChange}
                style={{ fontSize: "1.4rem" }}
                placeholder="Search" />
            </InputWrapper>
          </HeaderSearch>
          <Activity>
            <Button onClick={() => setShowCreateModal(true)}>
              Post a photo
            </Button>
            <NavLink to="/search" activeClassName="activeNavLink">
              <SearchIconNav width={26} height={26} />
            </NavLink>
            <NavLink to="/notifications/income" activeClassName="activeNavLink">
              {notificationUnseen ? <NotificationIconDot
                width={26}
                height={26}
                strokeWidth={2}
                color="#afafaf"
              /> : <NotificationIcon color="#afafaf" width={26} height={26} strokeWidth={2.5} />}
            </NavLink>
            <NavLink to="/nft/market">
              <MarketPlaceIcon src={marketPlaceIcon} alt="Market Place" />
            </NavLink>
            {globeIcon()}
            <ButtonLink
              isActive={isMenuOpen}
              onClick={clickHandler}
            >
              {displayAvatar()}
              <UserMenu
                styleState={isMenuOpen} style={style}
              >
                <LinkToProfile to={currentUserProfileLink}>
                  Profile
                </LinkToProfile>
                <LinkToSettings to={currentUserSettingLink}>
                  Settings
                </LinkToSettings>
                <LogOut onClick={handleLogout} href="#" style={{ fontColor: "var(--red)" }}>
                  Log out
                </LogOut>
              </UserMenu>
            </ButtonLink>
          </Activity>
        </Header>
      </HeaderWrapper>
      <HeaderSpace>
      </HeaderSpace>
      <CreatePostModal show={showCreateModal} onHide={onHideHandler} />
    </HeaderHide>
  );
};

export default HeaderDesktop;

import React, {useContext} from "react";
import { NavLink, useLocation } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useNotification from "../../../hooks/useNotification";
import { ReactComponent as PlusCircle } from "../../../assets/icons/Add-photo.svg";
import { ReactComponent as PlusCircleBold } from "../../../assets/icons/Add-photoBold.svg";
import { ReactComponent as ProfileOutline } from "../../../assets/icons/profile.svg";
import { ReactComponent as ProfileOutlineBold } from "../../../assets/icons/profile-bold.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as SearchIconBold } from "../../../assets/icons/search-bold.svg";
import { ReactComponent as HomeIcon } from "../../../assets/icons/home.svg";
import { ReactComponent as HomeIconBold } from "../../../assets/icons/home-bold.svg";
import { ReactComponent as NotificationIconBold } from "../../../assets/icons/NotificationsBold.svg";
import { ReactComponent as NotificationIconDot } from "../../../assets/icons/Notification-dot.svg";
import { ReactComponent as NotificationIconNoDot } from "../../../assets/icons/Notification-nodot.svg";
import {LinkStyle} from "./style";
import {ThemeContext} from "styled-components";

export default () => {
  const location = useLocation();
  const { notificationUnseen } = useNotification();
  const { currentUser } = useCurrentUser();
  const currentUserProfileLink = "/" + (
    currentUser !== null
      ? encodeURIComponent(currentUser.username)
      : "");

  let themeContext = useContext(ThemeContext);
  // @FIXME: make sure themeContext is something proper at this point:
  if (!themeContext) {
    themeContext = {
      navIconColor: "var(--black)",
      navIconColorMuted: "var(--grey)",
    };
  }
  return (
    <>
      <LinkStyle>
        <NavLink to="/" onClick={() => window.scroll(0, 0, "auto")}>
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname === "/" ? (
            <HomeIconBold
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColor} />
          ) : (
            <HomeIcon
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>
      </LinkStyle>
      <LinkStyle>
        <NavLink to="/search">
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname.startsWith("/search") ? (
            <SearchIconBold
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColor}
            />
          ) : (
            <SearchIcon
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>
      </LinkStyle>

      <LinkStyle>
        <NavLink to="/create">
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname === "/post" ? (
            <PlusCircleBold
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColor}
            />
          ) : (
            <PlusCircle
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>

      <NavLink to="/post">
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname === "/post" ? (
            <PlusCircleBold
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColor}
            />
          ) : (
            <PlusCircle
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>
      </LinkStyle>

      <LinkStyle>
        <NavLink to="/notifications/income">
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname.startsWith("/notifications") ? (
            <NotificationIconBold width={25} height={25} color={themeContext.navIconColor}/>
          ) : notificationUnseen ? (
            <NotificationIconDot
              width={27}
              height={28}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          ) : (
            <NotificationIconNoDot
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>
      </LinkStyle>

      <LinkStyle>
        <NavLink to={currentUserProfileLink}>
        <span className="d-flex justify-content-center align-items-center">
          {location.pathname === currentUserProfileLink ? (
            <ProfileOutlineBold
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColor}
            />
          ) : (
            <ProfileOutline
              width={25}
              height={25}
              strokeWidth={2}
              color={themeContext.navIconColorMuted}
            />
          )}
        </span>
        </NavLink>
      </LinkStyle>
    </>
  );
};

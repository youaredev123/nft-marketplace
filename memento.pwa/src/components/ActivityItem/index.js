import moment from "moment";
import React, { useContext, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useIntersection } from "use-intersection";
import { ReactComponent as NotificationComments } from "assets/icons/notification-comments.svg";
import { ReactComponent as NotificationFollowing } from "assets/icons/notification-following.svg";
import { ReactComponent as NotificationLiked } from "assets/icons/notification-like.svg";
import { ReactComponent as NotificationTag } from "assets/icons/notification-tag.svg";
import { ReactComponent as NotificationFavourited } from "assets/icons/notification-added-to-favourites.svg";

import Avatar from "components/Avatar";
import useFeedItem from "hooks/useFeedItem";
import useNotification from "hooks/useNotification";
import useProfile from "hooks/useProfile";

import { ActivityRow, ActivityVerticalGroup, ProfileName, ProfileNameLink, Spacer, TimeLabel, AmountOwner } from "./styles";
import { ThemeContext } from "styled-components";
import { withMemo } from "hoc/withMemo";
import useIsMounted from "hooks/useIsMounted";

const ActivityItemComponent = ({ notification, showAvatar = true, showSpacer = true, renderOnSidebar = false }) => {
  const { updateSeen } = useNotification();
  const { post, fetchPost } = useFeedItem();
  const { fetchProfileById, profile } = useProfile();
  const themeContext = useContext(ThemeContext);
  const target = React.useRef();
  const isMounted = useIsMounted();
  const visible = useIntersection(target, {
    once: true,
  });

  React.useEffect(() => {
    if (visible && isMounted) {
        updateSeen(notification.id);
        if (notification && notification.fromUserId) {
          fetchProfileById(notification.fromUserId);
        }
        if (notification && notification.contentId) {
          fetchPost(notification.contentId);
        }
    }
  }, [fetchProfileById, fetchPost, visible, notification]);

  const renderAvatar = React.useCallback(() => {
    if (!showAvatar) {
      return null;
    }

    let avatar = null;
    switch (notification.userAction) {
      case "COMMENTED":
        avatar =
          notification.contentId && post && post.images ? (
            <Link to={`/post/${notification.contentId}`}>
              <Avatar url={post && post.images[0]} height={40} width={40} placeholderAvt/>
            </Link>
          ) : (
            <Skeleton circle={true} height={40} width={40} style={{
              backgroundImage: themeContext.skeleton,
              backgroundColor: themeContext.bgColorSkeletonAvatar
            }}/>
          );
        break;
      case "LIKED":
      case "TAGGED":
      case "FAVOURITED":
        avatar =
          post && post.images ? (
            <Link
              to={{
                pathname: `/post/${notification.contentId}`,
                state: { modal: true },
              }}
            >
              <Avatar url={post && post.images[0]} height={40} width={40} placeholderAvt />
            </Link>
          ) : (
            <Skeleton
              style={{ backgroundColor: "var(--lightGrey)" }}
              circle={true}
              height={40}
              width={40}
            />
          );
        break;
      case "FOLLOWED":
        avatar =
          profile && profile.profilePic ? (
            <Link
              to={`/${profile.username}`}
            >
              <Avatar url={profile.profilePic} height={40} width={40} placeholderAvt />
            </Link>
          ) : (
            <Skeleton
              style={{ backgroundColor: "var(--lightGrey)" }}
              circle={true}
              height={40}
              width={40}
            />
          );
      default:
        break;
    }
    return avatar;
  }, [profile, post, showAvatar, notification]);

  const renderMessage = (notification) => {
    let content = null;
    switch (notification.userAction) {
      case "COMMENTED":
        content = (
          <ProfileName className="mb-0 mt-1">
            <ProfileNameLink
              to={`/${notification.fromUsername}`}
            >
              {notification.fromUsername}
            </ProfileNameLink>{" "}
            commented on your picture!
          </ProfileName>
        );
        break;
      case "LIKED":
        content = (
          <ProfileName className="mb-0 mt-1" style={{fontSize: "1.4rem"}}>
            <ProfileNameLink
              to={`/${notification.fromUsername}`}
            >
              {notification.fromUsername}
            </ProfileNameLink>{" "}
            liked your picture!
          </ProfileName>
        );
        break;
      case "TAGGED":
        content = (
          <ProfileName className="mb-0 mt-1">
            <ProfileNameLink
              to={`/${notification.fromUsername}`}
            >
              {notification.fromUsername}
            </ProfileNameLink>{" "}
            tagged you in a picture!
          </ProfileName>
        );
        break;
      case "FOLLOWED":
        content = (
          <ProfileName className="mb-0 mt-1">
            <ProfileNameLink
              to={`/${notification.fromUsername}`}
            >
              {notification.fromUsername}
            </ProfileNameLink>{" "}
            started following you!
          </ProfileName>
        );
        break;
      case "FAVOURITED":
        content = (
          <ProfileName className="mb-0 mt-1">
            <ProfileNameLink
              to={`/${notification.fromUsername}`}
            >
              {notification.fromUsername}
            </ProfileNameLink>{" "}
            saved your picture!
          </ProfileName>
        );
        break;
      default:
        break;
    }
    return content;
  };

  const renderIcon = (notification) => {
    let icon = null;
    switch (notification.userAction) {
      case "COMMENTED":
        icon = <NotificationComments className="mr-2"/>;
        break;
      case "LIKED":
        icon = <NotificationLiked/>;
        break;
      case "TAGGED":
        icon = <NotificationTag/>;
        break;
      case "FOLLOWED":
        icon = <NotificationFollowing/>;
        break;
      case "FAVOURITED":
        icon = <NotificationFavourited/>;
        break;
      default:
        break;
    }
    return icon;
  };

  const renderSpacer = React.useCallback(() => !showSpacer ? null : <Spacer/>, [showSpacer]);

  const renderAmount = useCallback(
    () => {
      if(!notification?.amountUsd) return;
      if(Number.parseInt(notification?.amountUsd) >= 1) {return `$${Number.parseFloat(notification?.amountUsd).toFixed(3)}`}
      else {return `${Math.round((notification?.amountUsd*100 + Number.EPSILON) * 100) / 100}c`}
    },
    [notification?.amountUsd],
  )

  if (renderOnSidebar) {
    return (
      <div className={"activity-item"} ref={target} style={{ WebkitTapHighlightColor: "transparent" }}>
        <div className={"d-flex flex-row"}>
          <ActivityVerticalGroup
            className="d-flex flex-column justify-content-start align-items-center p-2 mt-1">
            {renderIcon(notification)}
          </ActivityVerticalGroup>
          <div className={"d-flex flex-column"}>
            <ActivityVerticalGroup className="d-flex flex-column justify-content-center align-items-start p-2">
              {renderMessage(notification)}
              <AmountOwner>{renderAmount()}</AmountOwner>
            </ActivityVerticalGroup>
            <ActivityVerticalGroup className="d-flex flex-column justify-content-center align-items-center p-2">
              <TimeLabel>
                {notification &&
                notification.timestamp &&
                moment(new Date(notification.timestamp)).format("D MMM")}
              </TimeLabel>
            </ActivityVerticalGroup>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={target} style={{ WebkitTapHighlightColor: "transparent" }}>
      <ActivityRow hasborder>
        <ActivityVerticalGroup
          className="d-flex flex-column justify-content-center align-items-center p-2  mt-1">
          {renderIcon(notification)}
        </ActivityVerticalGroup>
        <ActivityVerticalGroup className="d-flex flex-column justify-content-center align-items-start p-2">
          {renderMessage(notification)}
          <AmountOwner>{renderAmount()}</AmountOwner>
        </ActivityVerticalGroup>
        <ActivityVerticalGroup className="d-flex flex-column justify-content-center align-items-center p-2">
          <TimeLabel>
            {notification &&
            notification.timestamp &&
            moment(new Date(notification.timestamp)).format("D MMM")}
          </TimeLabel>
          {renderAvatar()}
        </ActivityVerticalGroup>
      </ActivityRow>
      {renderSpacer()}
    </div>
  );
};

const ActivityItem = withMemo(ActivityItemComponent);

export default ActivityItem;

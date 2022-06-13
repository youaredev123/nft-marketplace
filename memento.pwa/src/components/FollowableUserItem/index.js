import React, { useCallback, useContext, useMemo, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import Button from "components/Button";
import flame_icon from 'assets/images/Flame_icon.svg';
import WhiteLeaderboardIcon from "assets/icons/Leaderboardicon.svg";
import DarkLeaderboardIcon from "assets/icons/Dark-mode-leaderboard-circle.svg";
import useFollowAndUnfollow from "hooks/useFollowAndUnfollow";
import { usePayments } from "hooks/usePayments";
import useCurrentUser from "hooks/useCurrentUser";
import { useAccount } from "hooks/useAccount";
import { DarkModeContext } from "hooks/useDarkMode";
import { LeaderboardIconFireStyle, LeaderboardIconStyle, UnreadIcon, UserItemContainer, UsernameLink } from "./styles";
import { ThemeContext } from "styled-components";
import { withMemo } from "hoc/withMemo";

const FollowableUserItem = withMemo(({ screenLikes = false, unreadMessages = false, leaderboard, index, isUserListScreen = false, user, ScreenFollowing }) => {
  const {
    onFollowStart,
    onFollowFail,
    onUnfollowStart,
    onUnfollowFail,
  } = useFollowAndUnfollow();
  const userInfo = screenLikes ? Object.values(user)[0] : user;

  const { account } = useAccount();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const themeContext = useContext(ThemeContext);
  const darkModeContext = useContext(DarkModeContext);
  const { pay } = usePayments();
  const [inFollow, setInFollow] = useState(false);
  const [inUnfollow, setInUnfollow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(ScreenFollowing ? ScreenFollowing : (userInfo?.isFollowing || false))

  const toggleFollow = useCallback(async () => {
    if (inFollow || inUnfollow) {
      return;
    }

    const shouldFollow = !isFollowing;
    if (shouldFollow) {
      setInFollow(true);
      
      await onFollowStart();
    } else {
      setInUnfollow(true);
      
      await onUnfollowStart();
    }

    const onEnd = () => {
      if (shouldFollow) {
        setInFollow(false);
        setCurrentUser({...account, followingCount: account.followingCount + 1});
        setIsFollowing(true)
      } else {
        setInUnfollow(false);
        setCurrentUser({...account, followingCount: account.followingCount - 1});
        setIsFollowing(false)
      }
    };

    pay({
      type: "FOLLOW",
      data: {
        userId: userInfo.userId,
        follow: shouldFollow,
      },
      username: userInfo.username,
      onPayment: onEnd,
      onError: () => {
        onEnd();
        if (shouldFollow) {
          onFollowFail();
        } else {
          onUnfollowFail();
        }
      },
      onMoneyButtonHide: rollbackFollowAndUnfollow,
    });
  }, [userInfo, pay, inFollow, inUnfollow]);

  const rollbackFollowAndUnfollow = useCallback(() => {
    if (inFollow && inUnfollow) {
      console.error("Relica: cannot be both in follow and unfollow states");
      setInFollow(false);
      setInUnfollow(false);
      return;
    }

    if (inFollow) {
      onFollowFail();
      setInFollow(false);
    } else if (inUnfollow) {
      onUnfollowFail();
      setInUnfollow(false);
    }

  }, [inFollow, inUnfollow]);

  const renderAvatar = useCallback(() =>
  userInfo && userInfo.username ? (
      <Link className={"avatar-link"} to={`/${userInfo.username}`}>
        <Avatar
          url={userInfo.profilePic}
          height={54}
          width={54}
          className="mr-3"
        />
      </Link>
    ) : (
      <Skeleton
        style={{ backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeletonAvatar }}
        circle={true}
        height={54}
        width={54}
        className="mr-3"
      />
    ), [userInfo, themeContext]);

  const renderUsername = useCallback(() =>
  userInfo && userInfo.username ? (
      <UsernameLink to={`/${userInfo.username}`}>
        {userInfo.username}
      </UsernameLink>
    ) : (
      <p>
        <Skeleton count={1}/>
      </p>
    ), [userInfo]);

  const leaderboardIcon = useMemo(() => {
    if (leaderboard) {
      const circleImg = darkModeContext.darkMode
        ? DarkLeaderboardIcon
        : WhiteLeaderboardIcon;
      return (
        <>
          <LeaderboardIconStyle className={"leaderboard-index-icon"}>
            <img src={circleImg} alt=""/>
            <span>
            {index + 1}
            </span>
          </LeaderboardIconStyle>
          {index === 0 && index < 99 && (
            <LeaderboardIconFireStyle className={"leaderboard-fire-icon"}>
              <img src={flame_icon} alt="leader list"/>
            </LeaderboardIconFireStyle>
          )
          }
        </>
      );
    }
  }, [leaderboard, index, darkModeContext]);

  return (
    <UserItemContainer className="d-flex align-items-center flex-grow-1">
      {renderAvatar()}
      {leaderboardIcon}
      {unreadMessages && <UnreadIcon className={"user-unread-icon"}/>}
      {userInfo && (
        <div
          className="username d-flex flex-column justify-content-between align-items-left flex-grow-1"
          style={{
            cursor: "pointer",
            height: "auto",
            padding: "5px 0 0 0",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {renderUsername()}

          {!isUserListScreen &&
          <div
            className={"action-buttons"}
            style={{
              cursor: "pointer",
              height: "auto",
              padding: "5px 0 0 0",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {userInfo.userId !== currentUser.id && (
              <Button
                onClick={toggleFollow}
                className={`small ${(!isFollowing || !ScreenFollowing) && "primary"} `}
                style={{ width: 85, fontSize: "1rem", padding: "0.5em", margin: "0px 0px 0px 1px" }}
              >
                {(isFollowing || ScreenFollowing) ? "Following" : "Follow $0.10"}
              </Button>
            )}
          </div>
          }
        </div>
      )}

      {isUserListScreen && user && (
        <div
          className={"action-buttons"}
          style={{
            cursor: "pointer",
            height: "auto",
            padding: "5px 0 0 0",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {userInfo.userId !== currentUser.id && (
            <Button
              onClick={toggleFollow}
              className={`small ${!isFollowing && "primary"}`}
              style={{ width: 99, fontSize: "1rem", padding: "1.2em 0.6em" }}
            >
              {isFollowing ? "Following" : "Follow $0.10"}
            </Button>
          )}
        </div>
      )}
    </UserItemContainer>
  );
});

export default FollowableUserItem;

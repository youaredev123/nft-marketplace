import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "react-infinite-scroll-hook";
import NotFound from "components/NotFound";

import useFollowAndUnfollow from "hooks/useFollowAndUnfollow";
import useUsersPosts from "hooks/useUsersPosts";
import { usePayments } from "hooks/usePayments";
import OthersProfileScreenMobile from "screens/OthersProfileScreen/Mobile";
import OthersProfileScreenDesktop from "screens/OthersProfileScreen/Desktop";

export default () => {
  const { username } = useParams();
  const {
    posts,
    fetchPosts,
    loading,
    hasNextPage,
    currentPage,
    clearPosts
  } = useUsersPosts();

  const {
    onFollowStart,
    onFollowFail,
    onUnfollowStart,
    onUnfollowFail,
    currentUser,
    profile,
    fetchProfileByName,
    userError
  } = useFollowAndUnfollow();

  const { pay } = usePayments();
  const [inFollow, setInFollow] = useState(false);
  const [inUnfollow, setInUnfollow] = useState(false);
  const themeContext = useContext(ThemeContext);

  const toggleFollow = useCallback(async () => {
    if (inFollow || inUnfollow) {
      return;
    }
    const shouldFollow = !profile.following;
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
      } else {
        setInUnfollow(false);
        clearPosts();
      }
    };

    pay({
      type: "FOLLOW",
      data: {
        userId: profile.id,
        follow: shouldFollow
      },
      username: profile.username,
      onPayment: () => {
        onEnd();
        // since back-end doesn't respond right after
        if (shouldFollow) {
          setTimeout(() => {
            fetchPosts(username);
          }, 3000);
        }
      },
      onError: () => {
        onEnd();
        if (shouldFollow) {
          onFollowFail();
        } else {
          onUnfollowFail();
        }
      },
      onMoneyButtonModalHide: rollbackFollowAndUnfollow
    });
  }, [profile, pay, inFollow, inUnfollow]);

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

  const loadMore = useCallback(() => {
    fetchPosts(username, currentPage + 1);
  }, [fetchPosts, currentPage]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body"
  });

  useEffect(() => {
    if (username) {
      fetchPosts(username);
      fetchProfileByName(username, true);
    }
  }, [fetchPosts, fetchProfileByName, username]);

  if (userError) {
    return <NotFound/>;
  }

  return (
    <>
      <OthersProfileScreenDesktop
        currentUser={currentUser}
        profile={profile}
        themeContext={themeContext}
        posts={posts}
        loading={loading}
        infiniteRef={infiniteRef}
        toggleFollow={toggleFollow}
      />
      <OthersProfileScreenMobile
        currentUser={currentUser}
        profile={profile}
        themeContext={themeContext}
        posts={posts}
        loading={loading}
        infiniteRef={infiniteRef}
        toggleFollow={toggleFollow}
      />
    </>
  );
};

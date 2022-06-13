import React, { useCallback, useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import NotFound from "../../components/NotFound";

import useMyProfile from "../../hooks/useMyProfile";
import MyProfileScreenMobile from "./Mobile";
import MyProfileScreenDesktop from "./Desktop";

const MyProfileScreen = () => {
  const {
    fetchPosts,
    loading,
    posts,
    currentPage,
    hasNextPage,
    profile,
    updateBioAndUsername,
    updateBannerImage,
    updateProfileImage,
    userError
  } = useMyProfile(42);
  const themeContext = useContext(ThemeContext);

  const loadMore = useCallback(() => {
    fetchPosts(undefined, currentPage + 1);
  }, [fetchPosts, currentPage]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body"
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchPosts();
    }
    return () => (isMounted = false);
  }, [fetchPosts]);

  if (userError) {
    return <NotFound/>;
  }

  return (
    <>
      <MyProfileScreenDesktop
        infiniteRef={infiniteRef}
        loading={loading}
        posts={posts}
        profile={profile}
        themeContext={themeContext}
        updateBannerImage={updateBannerImage}
        updateBioAndUsername={updateBioAndUsername}
        updateProfileImage={updateProfileImage}
        userError={userError}
      />
      <MyProfileScreenMobile
        infiniteRef={infiniteRef}
        loading={loading}
        posts={posts}
        profile={profile}
        themeContext={themeContext}
        updateBannerImage={updateBannerImage}
        updateBioAndUsername={updateBioAndUsername}
        updateProfileImage={updateProfileImage}
        userError={userError}
      />
    </>
  );
};

export default MyProfileScreen;

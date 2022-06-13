import React, { memo, useCallback, useEffect } from "react";
import useUsersFeed from "../../hooks/useUsersFeed";
import FeedListDesktop from "./Desktop";
import FeedListMobile from "./Mobile";
import useIsMounted from "hooks/useIsMounted";
import useWindowDimensions from "hooks/useWindowWidth";

const FeedList = memo(() => {
  const isMounted = useIsMounted();
  const { windowWidth } = useWindowDimensions();
  const {
    posts,
    loadNewPosts,
    loadNewPostsDesktop,
    // checkLatestPost,
    hasNextPage,
    currentPage,
    loading,
    error,
    noPostsAvailable
  } = useUsersFeed(42);

  const isDesktopMode = !window.mobileCheck();

  const loadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      isDesktopMode ? loadNewPostsDesktop(currentPage + 1) : loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, loadNewPostsDesktop, currentPage, hasNextPage]);

  useEffect(() => {
    // if (posts && posts.length) {
      // checkLatestPost(posts[0]);
    // } else if (isMounted) {
      isDesktopMode ? loadNewPostsDesktop() : loadNewPosts();
    // }
  }, []);

  return (
    <>
      {windowWidth > 480 && (
        <FeedListDesktop
          error={error}
          loading={loading}
          loadMore={loadMore}
          noPostsAvailable={noPostsAvailable}
          posts={posts}
        />
      )}
      {windowWidth <= 480 && (
        <FeedListMobile
          error={error}
          loading={loading}
          loadMore={loadMore}
          noPostsAvailable={noPostsAvailable}
          posts={posts}
        />
      )}
    </>
  );
});

export default FeedList;

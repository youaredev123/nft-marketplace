import { useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ContentService from "../services/ContentService";
import { useEffect } from "react";
import useLatestPosts from "./useLatestPosts";

const useUsersFeed = (maxPage = 42) => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useLocalStorage("users_feed", [], true);
  const [noPostsAvailable, setNoPosts] = useState(false);
  const [currentPage, setCurrentPage] = useLocalStorage(
    "users_feed_current_page",
    0,
    true
  );
  const { syncPosts } = useLatestPosts();
  const [hasNextPage, setHasNextPage] = useLocalStorage(
    "users_feed_next_page",
    true,
    true
  );
  useEffect(() => {
    if (posts.length) {
      setNoPosts(false);
    }
  }, [posts]);
  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.latestForUser(page, size).then(async (response) => {
        if (!response.hasError) {
          const contentIds = response.data.pictures.map((p) => p.contentId);
          const pictures = response.data.pictures;
          await syncPosts(pictures);

          if (contentIds && contentIds.length === maxPage) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            let unique = [...new Set(contentIds)];
            setPosts(unique);
            if (unique.length === 0) {
              setNoPosts(true);
            }
          } else {
            let unique = [...new Set([...posts, ...contentIds])];
            setPosts(unique);
            if (unique.length === 0) {
              setNoPosts(true);
            }
          }
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    },
    [posts, setPosts, setHasNextPage]
  );

  const loadNewPostsDesktop = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.latestForUserDesktop().then(async (response) => {
        if (!response.hasError) {
          const contentIds = response.data.pictures.map((p) => p.contentId);
          const postsWithComments = response.data.pictures;
          await syncPosts(postsWithComments);

          if (contentIds && contentIds.length === maxPage) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            let unique = [...new Set(postsWithComments)];
            setPosts(unique);
            if (unique.length === 0) {
              setNoPosts(true);
            }
          } else {
            let unique = [...new Set([...posts, ...postsWithComments])];
            setPosts(unique);
            if (unique.length === 0) {
              setNoPosts(true);
            }
          }
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    },
    [posts, setPosts, setHasNextPage]
  );

  // const checkLatestPost = useCallback(
  //   async (contentId) => {
  //     const response = await ContentService.latest(0, 1);
  //     if (!response.hasError) {
  //       const contentIds = response.data.pictures.map((p) => p.contentId);
  //       const pictures = response.data.pictures;
  //       await syncPosts(pictures);
  //       if (contentIds && contentIds.length === 1) {
  //         if (contentId !== contentIds[0]) {
  //           loadNewPosts();
  //         }
  //       }
  //     }
  //   },
  //   [loadNewPosts]
  // );

  return {
    error,
    posts,
    // checkLatestPost,
    loadNewPosts,
    loadNewPostsDesktop,
    currentPage,
    hasNextPage,
    loading,
    noPostsAvailable,
  };
};

export default useUsersFeed;

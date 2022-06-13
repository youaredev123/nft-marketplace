import { useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { db, getPost } from "../api";

import ContentService from "../services/ContentService";
import useLatestPosts from "./useLatestPosts";

export const useFeed = (maxPage = 42) => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useLocalStorage("feed", [], true);
  const [currentPage, setCurrentPage] = useLocalStorage(
    "feed_current_page",
    0,
    true
  );
  const [hasNextPage, setHasNextPage] = useLocalStorage(
    "feed_next_page",
    true,
    true
  );
  const { syncPosts } = useLatestPosts();
  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.latest(page, size).then(async (response) => {
        if (!response.hasError) {
          const contentIds = response.data.pictures.map((p) => p.contentId);
          const pictures = response.data.pictures;
          await syncPosts(pictures);

          if (contentIds && contentIds.length > 0) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            let unique = [...new Set(contentIds)];
            setPosts(unique);
          } else {
            let unique = [...new Set([...posts, ...contentIds])];
            setPosts(unique);
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
  //       if (response.data.contentIds && response.data.contentIds.length === 1) {
  //         if (contentId !== response.data.contentIds[0]) {
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
    setPosts,
    // checkLatestPost,
    loadNewPosts,
    currentPage,
    hasNextPage,
    loading,
  };
};

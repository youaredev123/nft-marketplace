import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

import ContentService from "../services/ContentService";
import useLatestPosts from "./useLatestPosts";

export const useFavouritesFeed = (maxPage = 42) => {
  const [error, setError] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [noPostsAvailable, setNoPostsAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { syncPosts } = useLatestPosts();
  const [hasNextPage, setHasNextPage] = useState(true);
  useEffect(() => {
    if (posts.length) {
      setNoPostsAvailable(false);
    }
  }, [posts]);
  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.favourites(page, size).then(async (response) => {
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
              setNoPostsAvailable(true);
            }
          } else {
            let unique = [...new Set([...posts, ...contentIds])];
            setPosts(unique);
            if (unique.length === 0) {
              setNoPostsAvailable(true);
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

  return {
    error,
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    isLoading,
    noPostsAvailable,
  };
};

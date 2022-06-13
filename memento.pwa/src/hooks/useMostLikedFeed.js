import { useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ContentService from "../services/ContentService";

export const useMostLikedFeed = (maxPage = 10) => {
  const [error, setError] = useState(undefined);
  const [mostLikedLoading, setLoading] = useState(false);
  const [mostLikedPosts, setMostLikedPosts] = useLocalStorage(
    "mostLikedFeed",
    [],
    true
  );
  const [mostLikedCurrentPage, setMostLikedCurrentPage] = useState(0);
  const [mostLikedHasNextPage, setMostLikedHasNextPage] = useState(true);

  const loadNewMostLikedPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.exploreMostLiked(page, size).then((response) => {
        if (!response.hasError) {
          const contentIds = response.data.contentIds;
          if (contentIds && contentIds.length === maxPage) {
            setMostLikedHasNextPage(true);
          } else {
            setMostLikedHasNextPage(false);
          }
          setMostLikedCurrentPage(response.data.currentPage);

          if (page === 0) {
            setMostLikedPosts(contentIds);
          } else {
            setMostLikedPosts([...mostLikedPosts, ...contentIds]);
          }
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    },
    [mostLikedPosts, setMostLikedPosts, setMostLikedHasNextPage]
  );

  return {
    error,
    mostLikedPosts,
    loadNewMostLikedPosts,
    mostLikedCurrentPage,
    mostLikedHasNextPage,
    mostLikedLoading,
    setMostLikedPosts
  };
};

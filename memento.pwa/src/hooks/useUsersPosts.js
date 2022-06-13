import { useState, useCallback } from "react";
import useLatestPosts from "./useLatestPosts";

import ContentService from "../services/ContentService";

const useUsersPosts = (maxPage = 42) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { syncPosts } = useLatestPosts();

  const fetchPosts = useCallback(
    async (username = undefined, page = 0, size = maxPage) => {
      setLoading(true);
      ContentService.myPosts(username, page, size).then(async (response) => {
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
          setPosts((previousPosts) => [
            ...previousPosts,
            ...response.data.contentIds
          ]);
        }
        setLoading(false);
      });
    },
    [setPosts, setCurrentPage, setHasNextPage]
  );

  const clearPosts = () => {
    setPosts([]);
  };

  return {
    fetchPosts,
    loading,
    posts,
    currentPage,
    hasNextPage,
    clearPosts
  };
};

export default useUsersPosts;

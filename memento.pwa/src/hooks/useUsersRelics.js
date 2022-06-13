import { useState, useCallback } from "react";

import RelicService from "../services/RelicService";

export default (maxPage = 42) => {
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);

  const fetchPosts = useCallback(
    async (userId, page = 0, size = maxPage) => {
      setLoading(true);
      RelicService.relicsByUser({ userId, page, size }).then(async (response) => {
        if (!response.hasError) {
          const relics = response.data.relics;
          if (relics && relics.length === maxPage) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);

          setPosts(posts => [
            ...posts.slice(0, page * size),
            ...relics,
            ...posts.slice((page + 1) * size),
          ]);
        }
        setLoading(false);
      });
    },
    [setPosts, setCurrentPage, setHasNextPage, maxPage]
  );

  return {
    fetchPosts,
    loading,
    posts,
    currentPage,
    hasNextPage,
  };
};

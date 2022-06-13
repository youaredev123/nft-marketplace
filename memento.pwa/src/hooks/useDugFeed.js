import { useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

import RelicService from "../services/RelicService";

export default (maxPage = 42) => {
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useLocalStorage(
    "relics_dug_feed",
    [],
    true
  );
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);

  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      const response = await RelicService.myDug({ page, size });
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
      } else {
        setError(response.message);
      }
      setLoading(false);
    }, [setPosts, hasNextPage, setLoading]);

  return {
    error,
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    loading,
  };
};

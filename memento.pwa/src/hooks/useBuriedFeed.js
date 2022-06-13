import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

import RelicService from "../services/RelicService";

export default (isMine, maxPage = 42, countryCode = null) => {
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts, hydratePosts ] = useLocalStorage(
    isMine
      ? "relics_buried_feed_mine"
      : `relics_buried_feed_others_${countryCode}`,
    [],
    true
  );
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);
  const [ currentPageOther, setCurrentPageOther ] = useState(0);
  const [ hasNextPageOther, setHasNextPageOther ] = useState(true);

    const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      if (!isMine && !countryCode) {
        return;
      }
      setLoading(true);
      const response = isMine
        ? await RelicService.myBuried({ page, size })
        : await RelicService.otherBuriers({ page, size, countryCode });
      if (!response.hasError) {
        const relics = response.data.relics;
        if (isMine) {
            setHasNextPage(relics && relics.length === maxPage);
            setCurrentPage(response.data.currentPage);
        } else {
            setHasNextPageOther(relics && relics.length === maxPage);
            setCurrentPageOther(response.data.currentPage);
        }

        setPosts(posts => [
          ...posts.slice(0, page * size),
          ...relics,
          ...posts.slice((page + 1) * size),
        ]);
      } else {
        setError(response.message);
      }
      setLoading(false);
    }, [posts, hasNextPage, setLoading, isMine, countryCode]);

  return {
    error,
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    currentPageOther,
    hasNextPageOther,
    loading,
  };
};

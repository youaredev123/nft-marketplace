import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../useLocalStorage";

import NftService from "../../services/NftService";

export default (maxPage = 42) => {
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useLocalStorage(
    "my_nfts_feed",
    [],
    true
  );
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);
  const history = useHistory();

  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
      if (!walletInfo) return history.push('/wallet/login');

      const password = walletInfo.password
      const response = await NftService.getMyNft({ page, size, password });
      if (!response.hasError) {
        const orders = response.data.relics;
        if (orders && orders.length === maxPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
        setCurrentPage(response.data.currentPage ?? 1);

        setPosts(posts => [
          ...posts.slice(0, page * size),
          ...orders,
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

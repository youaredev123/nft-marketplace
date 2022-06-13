import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../useLocalStorage";

import NftService from "../../services/NftService";

export default (maxPage = 42) => {
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useLocalStorage(
    "nft_collection",
    [],
    true
  );

  const [ collectionDetails, setCollectionDetails ] = useLocalStorage(
    "collectionDetails",
    {},
    true
  );

  const [ nfts, setNFTs ] = useState([]);
  const [ collectionInfo, setCollectionInfo ] = useState([]);
  
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);
  const history = useHistory();

  const loadNewPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
      if (!walletInfo) return history.push('/wallet/login');

      const password = walletInfo.password;
      const response = await NftService.getCollection({ page, size, password });
      if (!response.hasError) {
        const orders = response.data.collections;
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

  const loadNftsByCollection = useCallback(
    async (collectionId, page = 0, size = maxPage) => {
      setLoading(true);
      const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
      if (!walletInfo) return history.push('/wallet/login');

      const password = walletInfo.password;
      const response = await NftService.getNFTsByCollection(page, size, collectionId, password);
      if (!response.hasError) {
        const result = response.data;
        if (result && result.length === maxPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
        setCurrentPage(response.data.currentPage ?? 1);

        setNFTs(result.nfts);

        const collection = {
          collectionId: result.collectionId,
          createdTimestamp: result.createdTimestamp,
          originLocation: result.originLocation,
          staticImageLocation: result.staticImageLocation,
          title: result.title,
          total: result.total,
          userId: result.userId,
        }

        setCollectionInfo(collection);
        setCollectionDetails({
          ...collection,
          nfts: [
            ...nfts.slice(0, page * size),
            ...result.nfts,
            ...nfts.slice((page + 1) * size)
          ]
        });

      } else {
        setError(response.message);
      }
      setLoading(false);
    }, [setCollectionDetails, hasNextPage, setLoading]);

  return {
    error,
    posts,
    collectionDetails,
    collectionInfo,
    loadNewPosts,
    loadNftsByCollection,
    currentPage,
    hasNextPage,
    loading,
  };
};

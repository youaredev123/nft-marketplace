import { useState, useCallback } from "react";
import { useLocalStorage } from "../useLocalStorage";

import NftService from "../../services/NftService";
import CurrencyConverter from "../../lib/currencyConverter";

export default (maxPage = 42) => {
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useLocalStorage(
    "orders_feed",
    [],
    true
  );
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ hasNextPage, setHasNextPage ] = useState(true);

  const defaultOrderType = 'open';
  const [ orderType, setOrderType ] = useState(defaultOrderType);

  const loadNewPosts = useCallback(
    async (orderType = defaultOrderType, price = '', page = 0, size = maxPage) => {
      setLoading(true);
      price = sorterMapping(price);
      const response = await NftService.getOrder({ page, size, price, orderType });
      if (!response.hasError) {
        let url = `https://api.cryptonator.com/api/ticker/bsv-usd`;
        const res = await fetch(url);
        const data = await res.json();

        let orders = response.data.orders;

        
        orders = orders.map(order => {
          order.satoshis = CurrencyConverter.convertListOfSatoshis(order.satoshis, data);
          const raritySplittedVals = order.rarity.split('/');

          return order = {
          ...order,
          filled: orderType != defaultOrderType,
          index: raritySplittedVals[0],
          maxSupply: raritySplittedVals[1]
        }});

        if (orders && orders.length === maxPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }

        setCurrentPage(response.data.currentPage);

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

  const sorterMapping = (sorter) => {
    switch (sorter) {
      case 'Most Recent':
        return '';

      case 'Highest Price':
        return 'desc';

      case 'Lowest Price':
        return 'asc';

      default: 
        return '';
    }
  }
  
  return {
    error,
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    orderType,
    setOrderType,
    loading,
  };
};

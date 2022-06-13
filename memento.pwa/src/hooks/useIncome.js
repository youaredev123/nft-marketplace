import { useCallback, useState } from "react";
import UserService from "../services/UserService";
import { useLocalStorage } from "./useLocalStorage";

const useIncome = (maxPage = 10) => {
  const [loadingEarned, setLoadingEarned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalEarnedFollowers, setTotalEarnedFollowers] = useState(0);
  const [totalEarnedReferrals, setTotalEarnedReferrals] = useState(0);
  const [error, setError] = useState(undefined);
  const [incomeList, setIncomeList] = useLocalStorage("incomeList", [], true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchTotalEarned = useCallback(async () => {
    setLoadingEarned(true);
    const response = await UserService.totalEarned();
    if (!response.hasError) {
      setTotalEarned(response.data.totalEarned);
      setTotalFollowers(response.data.totalFollowers);
      setTotalEarnedFollowers(response.data.totalEarnedFollowers);
      setTotalEarnedReferrals(response.data.totalEarnedReferrals);
    }
    setLoadingEarned(false);
  }, [loadingEarned]);

  const fetchPostIncome = useCallback(
    async (page = 0, size = maxPage) => {
      setLoading(true);
      UserService.postEarnings({ page, size }).then((response) => {
        if (!response.hasError) {
          if (
            response.data.contentIncome &&
            response.data.contentIncome.length === maxPage
          ) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            setIncomeList(response.data.contentIncome);
          } else {
            setIncomeList([...incomeList, ...response.data.contentIncome]);
          }
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    },
    [incomeList, setIncomeList, setHasNextPage]
  );

  return {
    loading,
    totalEarned,
    totalFollowers,
    totalEarnedFollowers,
    totalEarnedReferrals,
    fetchTotalEarned,
    incomeList,
    fetchPostIncome,
    currentPage,
    hasNextPage,
    error,
  };
};

export default useIncome;

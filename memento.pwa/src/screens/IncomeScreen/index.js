import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useIncome from "hooks/useIncome";
import IncomeScreenMobile from "./Mobile";
import IncomeScreenDesktop from "./Desktop";
import useWindowDimensions from "hooks/useWindowWidth";
import useIsMounted from "hooks/useIsMounted";

const IncomeScreen = ({ viewPost }) => {
  const { windowWidth } = useWindowDimensions();
  const isMounted = useIsMounted();

  const {
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
  } = useIncome(10);

  const loadMore = React.useCallback(() => {
    fetchPostIncome(currentPage + 1);
  }, [fetchPostIncome, hasNextPage, currentPage]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  React.useEffect(() => {
    if (isMounted) {
      fetchTotalEarned();
      fetchPostIncome();
    }
  }, []);

  return (
    <>
      {windowWidth <= 480 && (
        <IncomeScreenMobile
          loading={loading}
          incomeList={incomeList}
          infiniteRef={infiniteRef}
          totalEarned={totalEarned}
          totalEarnedFollowers={totalEarnedFollowers}
          totalEarnedReferrals={totalEarnedReferrals}
          totalFollowers={totalFollowers}
          hasNextPage={hasNextPage}
        />
      )}
      {windowWidth > 480 && (
        <IncomeScreenDesktop
          hasNextPage={hasNextPage}
          loading={loading}
          incomeList={incomeList}
          infiniteRef={infiniteRef}
          totalEarned={totalEarned}
          totalEarnedFollowers={totalEarnedFollowers}
          totalEarnedReferrals={totalEarnedReferrals}
          totalFollowers={totalFollowers}
          viewPost={viewPost}
        />
      )}
    </>
  );
};

export default IncomeScreen;

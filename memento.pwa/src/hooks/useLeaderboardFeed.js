import {useState, useCallback} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

import ContentService from "../services/ContentService";

export const useLeaderboardFeed = (maxPage = 10) => {
  const [error, setError] = useState(undefined);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardPosts, setLeaderboardPosts] = useLocalStorage(
    "leaderboardFeed",
    [],
    true
  );
  const [leaderboardCurrentPage, setLeaderboardCurrentPage] = useState(0);
  const [leaderboardNextPage, setLeaderboardNextPage] = useState(true);

  const leaderboardLoadPosts = useCallback(
    async (page = 0, size = maxPage) => {
      setLeaderboardLoading(true);

      ContentService.exploreUsersLeaderboard(page, size).then((response) => {
        if (!response.hasError) {
          const contentIds = response.data
          if (contentIds && contentIds.length === maxPage) {
            setLeaderboardNextPage(true);
          } else {
            setLeaderboardNextPage(false);
          }

          setLeaderboardCurrentPage(response.data.currentPage);
          if (page === 0) {
            setLeaderboardPosts(contentIds);
          } else {
            setLeaderboardPosts([...leaderboardPosts, ...contentIds]);
          }
        } else {
          setError(response.message);
        }
        setLeaderboardLoading(false);
      });
    },
    [leaderboardLoading, setLeaderboardPosts, setLeaderboardNextPage]
  );

  return {
    error,
    leaderboardPosts,
    leaderboardLoadPosts,
    leaderboardCurrentPage,
    leaderboardNextPage,
    leaderboardLoading,
  };
};

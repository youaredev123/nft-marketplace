import { useState, useCallback } from "react";
import UserService from "../services/UserService";

import useFeedItem from "./useFeedItem";

const useFollowing = (maxPage = 42) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchFollowing = useCallback(
    async (userId = undefined, page = 0, size = maxPage) => {
      setLoading(true);
      UserService.following({ userId, page, size }).then((response) => {
        if (!response.hasError) {
          if (
            response.data.following &&
            response.data.following.length === maxPage
          ) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            setUsers(response.data.following);
          } else {
            setUsers([...users, ...response.data.following]);
          }
        }
        setLoading(false);
      });
    },
    [users, setUsers, setHasNextPage]
  );

  return {
    fetchFollowing,
    loading,
    currentPage,
    hasNextPage,
    users,
  };
};

export default useFollowing;

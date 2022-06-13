import { useState, useCallback } from "react";
import UserService from "../services/UserService";

const useFollowers = (maxPage = 42) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchFollowers = useCallback(
    async (userId = undefined, page = 0, size = maxPage) => {
      setLoading(true);
      UserService.followers({ userId, page, size }).then((response) => {
        if (!response.hasError) {
          if (
            response.data.followers &&
            response.data.followers.length === maxPage
          ) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setCurrentPage(response.data.currentPage);
          if (page === 0) {
            setUsers(response.data.followers);
          } else {
            setUsers([...users, ...response.data.followers]);
          }
        }
        setLoading(false);
      });
    },
    [users, setUsers, setHasNextPage]
  );

  return {
    fetchFollowers,
    loading,
    users,
    currentPage,
    hasNextPage,
  };
};

export default useFollowers;

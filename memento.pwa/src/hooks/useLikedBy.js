import { useState, useCallback } from "react";
import ContentService from "../services/ContentService";

const useLikedBy = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [users, setUsers] = useState([]);

  const fetch = useCallback(
    async (contentId, page = 0) => {
      if (page !== 0) {
        return;
      }
      setLoading(true);
      ContentService.picture(contentId).then((response) => {
        if (!response.hasError) {
          setHasNextPage(false);
          setUsers(Object.keys(response.data.userLikes).map(
            key => { return { ...response.data.userLikes, userId: key } }));
          setCurrentPage(0);
        }
        setLoading(false);
      });
    },
    [users, setUsers, setHasNextPage]
  );

  return {
    fetch,
    loading,
    currentPage,
    hasNextPage,
    users,
  };
};

export default useLikedBy;

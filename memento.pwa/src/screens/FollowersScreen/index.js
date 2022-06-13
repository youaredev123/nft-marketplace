import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFollowers from "hooks/useFollowers";
import UserListScreen from "screens/UserListScreen";
import useCurrentUser from "hooks/useCurrentUser";

const FollowersScreen = () => {
  const { id } = useParams();
  const {
    fetchFollowers: fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
  } = useFollowers();

  const { currentUser } = useCurrentUser();

  const shouldDisplaySidebar = useCallback(() => {
    if (!currentUser) {
      return false;
    }

    return currentUser.id === id;
  }, [currentUser]);

  const shouldHideBorder = useCallback(() => {
    if (!currentUser) {
      return true;
    }

    return currentUser.id !== id;
  }, [currentUser]);

  return (
    <UserListScreen
      title={"Followers"}
      id={id}
      loading={loading}
      currentPage={currentPage}
      fetch={fetch}
      hasNextPage={hasNextPage}
      users={users}
      withSidebar={shouldDisplaySidebar()}
      hideBorder={shouldHideBorder()}
    />
  );
};

export default FollowersScreen;

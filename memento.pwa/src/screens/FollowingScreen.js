import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFollowing from "../hooks/useFollowing";
import useCurrentUser from "hooks/useCurrentUser";
import UserListScreen from "screens/UserListScreen";

const FollowingScreen = () => {
  const { id } = useParams();
  const {
    fetchFollowing: fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
  } = useFollowing();
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
      title={"Following"}
      id={id}
      fetch={fetch}
      loading={loading}
      users={users}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      withSidebar={shouldDisplaySidebar()}
      hideBorder={shouldHideBorder()}
      isFollowing
    />
  );
};

export default FollowingScreen;

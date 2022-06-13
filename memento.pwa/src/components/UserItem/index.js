import React, { useCallback, useState } from "react";
import FollowableUserItem from "components/FollowableUserItem";
import { withMemo } from "hoc/withMemo";
import UserService from "services/UserService";
import useAsyncEffect from "use-async-effect";

const UserItem = withMemo((
  {
    username,
    userId,
    index,
    unreadMessages = false,
    leaderboard = false,
    isUserListScreen = false
  }
) => {
  const [user, setUser] = useState(null);

  const fetchUserItemData = useCallback(async () => {
    let dbUser = null;
    if (username) {
      dbUser = await UserService.profileByName(username);
    } else if (userId) {
      dbUser = await UserService.profileById(userId);
    }

    return dbUser;
  }, [username, userId]);

  useAsyncEffect(async isMounted => {
    const userData = await fetchUserItemData();

    if (!isMounted()) return;

    setUser(userData.data);
  }, [username, userId]);

  const displayUser = useCallback(() => {
    if (!user) {
      return null;
    }

    return (
      <FollowableUserItem
        key={user.userId}
        userId={user.userId}
        unreadMessages={unreadMessages}
        leaderboard={leaderboard}
        index={index}
        isUserListScreen
      />
    );
  }, [user]);

  return <>{displayUser()}</>;
});

export default UserItem;

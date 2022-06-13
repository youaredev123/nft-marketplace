import ContentService from "services/ContentService";
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "components/Loader";
import NoResults from "components/NoResults";
import FollowableUserItem from "components/FollowableUserItem";
import "./styles.scss";
import useAsyncEffect from "use-async-effect";

const Discovers = ({ maxItems = 4 }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useAsyncEffect(async isMounted => {
    ContentService.exploreUsersLeaderboard(0, maxItems).then(response => {
      if (!isMounted() || !response.data || !response.data.users) return;

      setLoading(false);
      setUsers(response.data.users);
    });
  }, [maxItems]);

  const showLoading = useCallback(() => loading ? <Spinner/> : null, [loading]);

  const showUsers = useCallback(() => {
    if (loading) {
      return null;
    }

    if (!users.length) {
      return <NoResults>No users</NoResults>;
    }

    return users.map((user, index) => 
    <FollowableUserItem
    key={user.userId}
    user={user}
    unreadMessages={false}
    leaderboard
    index={index}
    isUserListScreen
  />
    );
  }, [users, loading]);

  return (
    <div className={"pt-5"}>
      {showLoading()}
      <div className={"discovers"}>
        {showUsers()}
      </div>
    </div>
  );
};

export default Discovers;

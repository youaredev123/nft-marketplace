import React, { useCallback, useContext, useEffect } from "react";
import NoResults from "components/NoResults";
import useCurrentUser from "hooks/useCurrentUser";
import useNotification from "hooks/useNotification";
import renderNotificationLoaders from "../../lib/renderNotificationLoaders";
import { ThemeContext } from "styled-components";
import ActivityItem from "components/ActivityItem";
import useIsMounted from "hooks/useIsMounted";

const ActivityScreen = () => {
  const {
    notifications,
    updateSeen,
    loading,
    fetchNotifications,
  } = useNotification();
  const { currentUser } = useCurrentUser();
  const themeContext = useContext(ThemeContext);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      updateSeen();
      if (currentUser && currentUser.id) {
        fetchNotifications(currentUser.id);
      }
    }
  }, []);

  const displayLoading = useCallback(() => loading ? renderNotificationLoaders(9, themeContext) : null, [loading]);

  const displayNotifications = useCallback(() => {
    if (loading) {
      return null;
    }

    if (!notifications.length) {
      return <NoResults className="text-center mt-4">No notifications</NoResults>;
    }

    return notifications.map((notification) => (
      <ActivityItem
        key={notification.timestamp}
        notification={notification}
        showAvatar={true}
      />
    ));
  }, [loading, notifications]);

  return (
    <div className="pt-0 pr-3 pb-3 pl-3">
      {displayLoading()}
      {displayNotifications()}
    </div>
  );
};

export default ActivityScreen;

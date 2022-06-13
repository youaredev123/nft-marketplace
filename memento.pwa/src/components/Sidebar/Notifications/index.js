import useNotification from "hooks/useNotification";
import React, { useCallback, useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import renderNotificationLoaders from "lib/renderNotificationLoaders";
import NoResults from "components/NoResults";
import ActivityItem from "components/ActivityItem";
import { NotificationsWrapper } from "components/Sidebar/Notifications/styles";

const Notifications = ({ currentUser, maxItems = null }) => {
  const { notifications, loading, fetchNotifications } = useNotification();
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (currentUser || currentUser.id) {
      fetchNotifications(currentUser.id);
    }
  }, [currentUser]);

  const displayNotifications = useCallback(() => {
    if (loading) {
      return renderNotificationLoaders((maxItems ? maxItems : 4), themeContext);
    } else if (notifications && notifications.length) {
      return (maxItems ? notifications.slice(0, maxItems) : notifications).map((notification) => (
        <ActivityItem
          showAvatar={false}
          showSpacer={false}
          key={notification.timestamp}
          notification={notification}
          renderOnSidebar={true}
        />
      ));
    } else {
      return <NoResults>No notifications</NoResults>;
    }
  }, [notifications, loading, maxItems]);

  return (
    <NotificationsWrapper>
      {displayNotifications()}
    </NotificationsWrapper>
  );
};

export default Notifications;

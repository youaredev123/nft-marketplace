import firebase from "firebase/app";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "./useLocalStorage";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useLocalStorage(
    "relica_activity",
    [],
    true
  );
  const [notificationUnseen, setNotificationUnseen] = useLocalStorage(
    "relica_unseen",
    false
  );

  const fetchNotifications = useCallback(
    (userId) => {
      if (firebase.apps && userId) {
        setLoading(true);
        const notificationRef = firebase
          .firestore()
          .collection("notifications")
          .doc(userId);

        notificationRef
          .get({ source: "server" })
          .then((doc) => {
            if (doc.exists) {
              const rawData = doc.data();
              let dataWithTimestamp = Object.keys(rawData).map((key) => ({
                ...rawData[key],
                timestamp: parseInt(key, 10),
              }));
              dataWithTimestamp.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
              });
              setNotifications(dataWithTimestamp);
            } else {
              setNotifications([]);
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
            setNotifications([]);
          });
      }
    },
    [setNotifications, setLoading]
  );

  // Used within event listeners due to closure not being picked up during event driven updates.
  const notificationUnseenState = React.useRef(notificationUnseen);
  const setNotificationUnseenState = (data) => {
    notificationUnseenState.current = data;
    setNotificationUnseen(data);
  };

  const updateSeen = useCallback(() => {
    setNotificationUnseen(false);
  }, [setNotificationUnseen]);

  useEffect(() => {
    let eventListener = null;
    let postMessageListener = null;
    if (firebase && firebase.messaging && firebase.messaging.isSupported()) {
      eventListener = firebase.messaging().onMessage((payload) => {
        if (payload.data.userAction !== "PICTURE_CONTENT_RECONCILE") {
          setNotificationUnseenState(true);
        }
      });
      if ("serviceWorker" in navigator) {
        postMessageListener = navigator.serviceWorker.addEventListener(
          "message",
          (event) => {
            if (
              event.data &&
              event.data.firebaseMessaging &&
              event.data.firebaseMessaging.payload
            ) {
              if (
                event.data.firebaseMessaging.payload.data &&
                event.data.firebaseMessaging.payload.data.userAction !==
                  "PICTURE_CONTENT_RECONCILE"
              ) {
                setNotificationUnseenState(true);
              }
            } else {
              console.error("INVALID WEB PAYLOAD", event);
            }
          }
        );
      }
    }
    return () => {
      eventListener && eventListener();
      if ("serviceWorker" in navigator) {
        postMessageListener &&
          navigator.serviceWorker.removeEventListener(postMessageListener);
      }
    };
  }, [setNotificationUnseenState]);
  return (
    <NotificationContext.Provider
      value={{
        loading,
        notifications,
        setNotifications,
        notificationUnseen,
        fetchNotifications,
        updateSeen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  return useContext(NotificationContext);
};

export default useNotification;

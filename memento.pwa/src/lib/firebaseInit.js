import firebase from "firebase/app";
import UserService from "../services/UserService";

require("firebase/firestore");
require("firebase/messaging");
require("firebase/auth");
require("firebase/database");

const initialiseMessaging = (firebase) => {
  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(
      `${process.env.REACT_APP_FIREBASE_VAPID_KEY}`
    );
    messaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          UserService.updateMessagingToken(currentToken);
        } else {
          console.info(
            "No Instance ID token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
      });

    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          if (refreshedToken) {
            UserService.updateMessagingToken(refreshedToken);
          }
        })
        .catch((err) => {
          console.error("Unable to retrieve refreshed token ", err);
        });
    });

    return {
      messaging,
    };
  } else {
    console.error("Firebase messaging is not supported.");
  }
  return null;
};

const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
      authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
      databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
      projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
      storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
      messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
      appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
      measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
    });
    return initialiseMessaging(firebase);
  }
  return null;
};

export default init;

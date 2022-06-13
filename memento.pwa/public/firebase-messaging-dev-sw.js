// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAAYip54EybpIgRS5lJKcZlE9du7sB2KqE",
  authDomain: "relica-dev-13e07.firebaseapp.com",
  databaseURL: "https://relica-dev-13e07.firebaseio.com",
  projectId: "relica-dev-13e07",
  storageBucket: "relica-dev-13e07.appspot.com",
  messagingSenderId: "60885862559",
  appId: "1:60885862559:web:53450489d7129f7b117aaa",
  measurementId: "G-X7H7YQXTVX"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.info("SERVICE WORKER", payload);
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage({
          message: "relica_notification",
          payload: payload,
        });
      }
    })
    .then(() => {
      return registration.showNotification(payload.data.message);
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function (event) {
  console.log(event);
});

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
  apiKey: "AIzaSyBCJkxD4kLT3h0Rs6lTJPqxlsaW6MR3PBs",
  authDomain: "relica-fc6ea.firebaseapp.com",
  databaseURL: "https://relica-fc6ea.firebaseio.com",
  projectId: "relica-fc6ea",
  storageBucket: "relica-fc6ea.appspot.com",
  messagingSenderId: "472070992611",
  appId: "1:472070992611:web:ca51439849bd15f5414bd6",
  measurementId: "G-XSNNF7D6JH",
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
  // console.log(event);
});

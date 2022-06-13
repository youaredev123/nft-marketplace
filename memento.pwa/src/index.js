import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import init from "./lib/firebaseInit";
import "./styles/bootstrap-grid.min.css";
import "./styles/bootstrap-spacing.min.css";
import * as serviceWorker from "./serviceWorker";

init();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(
      `${process.env.PUBLIC_URL}/firebase-messaging-${process.env.REACT_APP_FIREBASE_ENV}-sw.js`
    )
    .then(function (registration) {
      console.info("Registration successful, scope is: ", registration.scope);
    })
    .catch(function (err) {
      console.error("Service worker registration failed, error:", err);
    });

    navigator.serviceWorker.addEventListener('controllerchange', (...args) => {
      console.info("Relica: controllerchange arguments follow");
      console.log(args);
    });
}

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept('./App', function() {
    ReactDOM.render(<App />, document.getElementById("root"));
  })
}

serviceWorker.register();

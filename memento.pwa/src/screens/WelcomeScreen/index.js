import React from "react";

import WelcomeScreenMobile from "./Mobile";
import WelcomeScreenDesktop from "./Desktop";

const WelcomeScreen = ({ onSave }) => {
  return (
    <>
      <WelcomeScreenMobile onSave={onSave}/>
      <WelcomeScreenDesktop/>
    </>
  );
};

export default WelcomeScreen;

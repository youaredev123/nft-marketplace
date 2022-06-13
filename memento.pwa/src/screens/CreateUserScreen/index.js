import React from "react";

import CreateUserScreenMobile from "./Mobile";
import CreateUserScreenDesktop from "./Desktop";

const CreateUserScreen = ({ onSave }) => {
  return (
    <>
      <CreateUserScreenMobile onSave={onSave}/>
      <CreateUserScreenDesktop onSave={onSave}/>
    </>
  );
};

export default CreateUserScreen;

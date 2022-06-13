import React from "react";
import ReactSwitch from "react-ios-switch";

export default ({ value, onChange }) => (
  <ReactSwitch checked={value} onChange={onChange} offColor="#AFAFAF" />
);

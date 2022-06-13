import React from "react";

import { TextAreaBase } from "../styles";

export default ({ name, onChange, onBlur, value, errors, ...rest }) => (
  <TextAreaBase
    name={name}
    onChange={(e) => onChange(e.target.value)}
    onBlur={onBlur}
    value={value}
    {...rest}
  />
);

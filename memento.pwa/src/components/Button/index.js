import React from "react";
import { ButtonBase } from "./styles";

const Button = ({ children, ...rest }) => (
  <ButtonBase {...rest}>{children}</ButtonBase>
);

export default Button;

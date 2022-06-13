import React from "react";

import { InputContainer, InputBase } from "../styles";

export default ({
  clickHandler,
  name,
  onChange,
  onFocus,
  onBlur,
  value,
  errors,
  icon,
  className,
  inputClassName,
  children,
  ...rest
}) => (
  <InputContainer className={className} onClick={() => clickHandler && clickHandler('all')}>
    {icon}
    <InputBase
      type="username"
      autoComplete="off"
      name={name}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => {
        e.target.setAttribute("autocomplete", "off");
        onFocus && onFocus();
      }}
      onBlur={onBlur}
      value={value}
      className={inputClassName || ""}
      {...rest}
    />
    {children}
  </InputContainer>
);

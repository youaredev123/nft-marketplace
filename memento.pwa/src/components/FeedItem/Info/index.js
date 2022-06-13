import React from "react";
import InfoIcon from "../../InfoIcon";

import { IconContainer } from "../styles";

export default ({ onClick, ...rest }) => (
  <IconContainer onClick={() => onClick()} {...rest}>
    <InfoIcon
      fill="none"
      strokeWidth={1.5}
      height={24}
      width={24}
      stroke="var(--grey)"
    />
  </IconContainer>
);

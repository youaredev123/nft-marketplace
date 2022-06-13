import React from "react";
import CommentIcon from "../../CommentIcon";
import { IconContainer, IconLabel } from "../styles";

export default ({ count, onClick = () => {}, ...rest }) => (
  <IconContainer onClick={() => onClick()} {...rest}>
    <CommentIcon
      fill="none"
      height={24}
      width={24}
      strokeWidth={1.5}
      className="mr-2"
      stroke="var(--grey)"
    />
    <IconLabel>{count}</IconLabel>
  </IconContainer>
);

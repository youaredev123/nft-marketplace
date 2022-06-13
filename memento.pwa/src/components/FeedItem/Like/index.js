import React from "react";
import LikeIcon from "../../LikeIcon";

import { IconContainer, IconLabel, IconWrapper, IconRing, IconCircles } from "../styles";

export default ({ liked = false, justLiked = false, count, onClick = () => {}, ...rest }) => (
  <IconContainer onClick={() => onClick()} {...rest}>
    <IconWrapper animate={justLiked} className="mr-2">
      <LikeIcon
        fill={liked ? "var(--red)" : "none"}
        height={24}
        width={24}
        strokeWidth={1.5}
        stroke={liked ? "var(--red)" : "var(--grey)"}
      />
      {justLiked ?
        <>
          <IconRing />
          <IconCircles />
        </>
        : ''}
    </IconWrapper>
    <IconLabel>{count}</IconLabel>
  </IconContainer>
);

import React from "react";
import FavouriteIconEmpty from "../../FavouriteIconEmpty";
import FavouriteIconFilled from "../../FavouriteIconFilled";

import { IconContainer, IconLabel, IconWrapper, IconRing, IconCircles } from "../styles";

export default ({ added = false, justAdded = false, count, onClick = () => {}, ...rest }) => (
  <IconContainer onClick={() => onClick()} {...rest}>
    <IconWrapper animate={justAdded} className="mr-2">
      {added ? <FavouriteIconFilled
        height={24}
        width={24}
        fill="#ffc424"
      /> : <FavouriteIconEmpty
        height={24}
        width={24}
      />}
      {justAdded ?
        <>
          <IconRing />
          <IconCircles />
        </>
        : ''}
    </IconWrapper>

    <IconLabel>{count}</IconLabel>
  </IconContainer>
);
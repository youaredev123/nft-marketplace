import React from "react";

import { Wrapper, Avatar, Username, Link, PictureWrapper } from "./styled";
import PlaceHolderAvatar from "../../../assets/images/avatar-placeholder.png";

const PrivateUser = ({ username, picture }) => {
  // as of 21-04-26 deleted follow button
  // you can check out git history if need to revert this and apply follow buton and it's logic
  return (
    <Wrapper>
      <PictureWrapper>
        <Link to={`/${username}`}>
          <Avatar
            urls={picture ? [picture, PlaceHolderAvatar] : [PlaceHolderAvatar]}
            showBackground={picture || false}
          />
          <Username>{username}</Username>
        </Link>
      </PictureWrapper>
    </Wrapper>
  );
};

export default PrivateUser;

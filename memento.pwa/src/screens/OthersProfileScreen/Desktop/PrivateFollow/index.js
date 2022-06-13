import React from "react";
import { ReactComponent as Lock } from "assets/icons/lock.svg";

import { Wrapper, IconWrapper, Text } from "./styles";

const PrivateFollow = () => (
  <Wrapper>
    <IconWrapper>
      <Lock />
    </IconWrapper>
    <Text>This account is private.</Text>
    <Text>You must follow them to access their content.</Text>
  </Wrapper>
);

export default PrivateFollow;

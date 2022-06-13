import React from "react";

import { Card, ImageWrapper, Age, IconWrapper, Icon, Amount } from "./styles";
import heartLock from "../../assets/icons/heart_lock.svg";
import blurred from "../../assets/images/exclusive_blurred.png";

const AdultCard = () => (
  <Card>
    <ImageWrapper img={blurred}>
      <Age>
        <IconWrapper>
          <Icon src={heartLock} />
          <Amount>18+</Amount>
        </IconWrapper>
      </Age>
    </ImageWrapper>
  </Card>
);

export default AdultCard;

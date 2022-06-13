import React from "react";

import {
  Toggle,
  ImageWrapper,
  Text,
  LikeToView,
  Icon,
  ToggleImage,
  CheckImage,
  CheckWrapper
} from "./styles";
import lock from "../../assets/icons/lock.svg";
import checkedCirle from "../../assets/icons/circle-selected.svg";
import nonCheckedCircle from "../../assets/icons/circle-non-selected.svg";
import clear from "../../assets/images/exclusive_clear.png";
import blurred from "../../assets/images/exclusive_blurred.png";

const ToggleComponent = ({ exclusive, onClick, checked }) => (
  <Toggle onClick={onClick(exclusive)} checked={checked}>
    <ImageWrapper>
      <ToggleImage
        src={exclusive ? blurred : clear}
        alt={exclusive ? "Exclusive" : "Public"}
      />
      {exclusive && (
        <LikeToView>
          <Icon src={lock} />
        </LikeToView>
      )}
    </ImageWrapper>
    <Text>{exclusive ? "Pay-to-View" : "Public"}</Text>
    <CheckWrapper>
      <CheckImage src={checked ? checkedCirle : nonCheckedCircle} />
    </CheckWrapper>
  </Toggle>
);

export default ToggleComponent;

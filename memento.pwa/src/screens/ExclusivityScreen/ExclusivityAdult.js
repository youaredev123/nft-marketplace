import React from "react";

import Slider from "./Slider";
import { Content, Info, Note } from "./styles";
import AdultCard from "../../components/AdultCard";

const ExclusivityAdult = ({
  sliderValue,
  pricePerLike,
  onPriceChange,
  onInputChange
}) => {
  return (
    <Content>
      <AdultCard />
      <Info margin>
        Your content will remain invisible to users until liked. You can change
        the price to unlock your content below.
      </Info>
      <Note>
        Note: (Your adult profile will only be discoverable via the search bar
        in the explore screen to ensure the browsing experience stays sensitive
        to different age groups)
      </Note>
      <Slider
        pricePerLike={pricePerLike}
        onChange={onPriceChange}
        pricePerLike={pricePerLike}
        sliderValue={sliderValue}
        onInputChange={onInputChange}
        max={205}
        label="Price to unlock"
      />
    </Content>
  );
};

export default ExclusivityAdult;

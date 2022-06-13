import React from "react";

import Toggle from "screens/ExclusivityScreen/Toggle";
import Slider from "screens/ExclusivityScreen/Slider";
import Button from "components/Button";
import { Content, Toggles, Info, Separator, Layout } from "screens/ExclusivityScreen/styles";

const ExclusivityMobile = ({
  exclusivity,
  onExclusivityChange,
  sliderValue,
  pricePerLike,
  onPriceChange,
  onInputChange,
  onInputBlur,
  step,
  onSaveButtonClick
}) => {
  const exclusiveText =
    "Your content will remain invisible to users until liked. You can change the price to unlock your content below.";

  const publicText =
    "Your photos will be visible for everyone to see. You can generate income through likes, comments, favourites, follows.";

  return (
    <Layout>
      <Content>
        <Toggles>
          <Toggle
            checked={!exclusivity}
            onClick={onExclusivityChange}
            exclusive={false}
          />
          <Toggle
            checked={exclusivity}
            onClick={onExclusivityChange}
            pricePerLike={pricePerLike}
            exclusive
          />
        </Toggles>
        <Info margin>{exclusivity ? exclusiveText : publicText}</Info>
        {exclusivity && (
          <Slider
            pricePerLike={pricePerLike}
            onChange={onPriceChange}
            sliderValue={sliderValue}
            onInputChange={onInputChange}
            onInputBlur={onInputBlur}
            step={step}
            label="Price to unlock"
            max={205}
          />
        )}
        <Separator />
        <Button
          onClick={onSaveButtonClick}
          className="primary"
          style={{
            borderRadius: "40px",
            padding: "16px",
            fontSize: "18px"
          }}
        >
          Save
        </Button>
      </Content>
    </Layout>
  );
};

export default ExclusivityMobile;

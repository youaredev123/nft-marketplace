import React from "react";
import { Info, Layout, PurchaseHeader, Separator, Toggles } from "screens/ExclusivityScreen/styles";
import Toggle from "screens/ExclusivityScreen/Toggle";
import Slider from "screens/ExclusivityScreen/Slider";
import Button from "components/Button";
import { Content, PurchaseButtonWrapper, SubmitButton } from "screens/ExclusivityScreen/Desktop/styles";

const ExclusivityDesktop = ({
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
      <Content style={{width: "70%", margin: "0 auto"}}>
        <PurchaseHeader className={"mb-5"}>Pay-to-view</PurchaseHeader>
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
        <Info margin style={{textAlign: "center"}}>{exclusivity ? exclusiveText : publicText}</Info>
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
        <PurchaseButtonWrapper style={{padding: "40px 0 20px 0"}}>
          <SubmitButton
            onClick={onSaveButtonClick}
            style={{
              width: "178px",
              padding: "16px",
              boxShadow: "0 0 20px #10a5f559",
              borderRadius: "50px",
              height: "46px",
            }}
          >
            Save
          </SubmitButton>
        </PurchaseButtonWrapper>
      </Content>
    </Layout>
  );
};

export default ExclusivityDesktop;

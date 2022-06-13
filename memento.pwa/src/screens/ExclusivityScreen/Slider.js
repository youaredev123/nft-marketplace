import React from "react";
import {
  SliderComponent,
  FadedText,
  SliderContainer,
  StyledTrack,
  StyledThumb,
  StyledSlider,
  SliderInput
} from "./styles";

const Thumb = (props) => <StyledThumb {...props} />;

const Track = (props, state) => (
  <StyledTrack {...props} index={state.index} value={state.value} />
);

const Slider = ({
  onChange,
  onInputChange,
  onInputBlur,
  pricePerLike,
  sliderValue,
  step,
  label,
  max
}) => {
  return (
    <SliderComponent>
      <FadedText>{label}</FadedText>
      <SliderContainer>
        <StyledSlider
          renderTrack={Track}
          renderThumb={Thumb}
          onChange={onChange}
          value={sliderValue}
          min={1}
          max={max}
        />
        <SliderInput
          value={pricePerLike}
          onValueChange={onInputChange}
          onBlur={onInputBlur}
          prefix="$"
          decimalSeparator="."
          allowNegativeValue={false}
          decimalScale={2}
          step={step}
        />
      </SliderContainer>
    </SliderComponent>
  );
};

export default Slider;

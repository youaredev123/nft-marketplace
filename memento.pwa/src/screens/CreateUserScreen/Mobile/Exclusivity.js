import React, { useState } from "react";

import { FormContainer, ImgContainer, Container, Wrapper } from "../styles";
import exclusivityHeader from "../../../assets/images/exclusivity-header.png";
import Content from "screens/ExclusivityScreen/Mobile/Exclusivity";
import { isPwa } from "../../../components/AuthLayout";
import Button from "../../../components/Button";

const Exclusivity = ({
  onNext,
  exclusivity,
  setExclusivity,
  pricePerLike,
  setPricePerLike
}) => {
  const max = 5;
  const min = 0.05;

  const [sliderValue, setSliderValue] = useState((pricePerLike / max) * 100);

  const handleExclusivityChange = (exclusive) => () => {
    setExclusivity(exclusive);
  };

  const handlePriceChange = (val) => {
    setSliderValue(val);
    if (val === 0) {
      setPricePerLike(min);
    } else {
      setPricePerLike((max * val) / 100);
    }
  };

  const handleInputChange = (e) => {
    let { value } = e.target;

    if (!value || value < min) {
      value = min;
    }

    setPricePerLike(value);
    setSliderValue((value / max) * 100);
  };

  return (
    <FormContainer>
      <ImgContainer>
        <img src={exclusivityHeader} alt="Exclusivity" />
      </ImgContainer>
      <Container>
        <Wrapper>
          <Content
            exclusivity={exclusivity}
            onExclusivityChange={handleExclusivityChange}
            sliderValue={sliderValue}
            pricePerLike={pricePerLike}
            onPriceChange={handlePriceChange}
            onInputChange={handleInputChange}
          />
        </Wrapper>
      </Container>
      {/* Reused button as it was in UsernamePhoto */}
      <Button
        className="primary"
        style={{
          padding: "17px",
          fontSize: "18px",
          width: "90%",
          margin: `0 auto ${window.mobileCheck() && !isPwa() ? "75px" : "25px"}`
        }}
        onClick={onNext}
      >
        Next
      </Button>
    </FormContainer>
  );
};

export default Exclusivity;

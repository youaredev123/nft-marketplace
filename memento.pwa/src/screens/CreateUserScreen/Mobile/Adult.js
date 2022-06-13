import React from "react";

import adultHeader from "../../../assets/images/adult-header.jpg";
import { isPwa } from "../../../components/AuthLayout";
import Button from "../../../components/Button";
import Nudity from "./Nudity";
import {
  FormContainer,
  ImgContainer,
  Container,
  Wrapper,
  FloatingButton,
  Arrow
} from "../styles";
import AdultCard from "../../../components/AdultCard";

const Adult = ({ onNext, onPrevious, adult, onAdultChange }) => (
  <FormContainer>
    <ImgContainer>
      <FloatingButton onClick={onPrevious}>
        <Arrow />
      </FloatingButton>
      <img src={adultHeader} alt="Adult" />
    </ImgContainer>
    <Container>
      <Wrapper>
        <AdultCard />
        <Nudity nudity={adult} onClick={onAdultChange} />
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

export default Adult;

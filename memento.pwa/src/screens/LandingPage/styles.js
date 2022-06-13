import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";
import ReactSlider from "react-slider";

export const SliderComponent = styled.div`
  margin-bottom: 3rem;
`;


export const FadedText = styled.p`
  font-size: 14px;
  color: var(--grey2);
`;

export const SliderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SliderInput = styled(CurrencyInput)`
  margin-top: 1px;
  margin-left: 1rem;
  font-size: 1.6rem;
  color: var(--green);
  width: 70px;
  border: 0;
  border-bottom: 1px solid var(--superLightGrey);
  text-align: center;
  border-radius: 0;
  background-color: ${({ theme }) => theme.bgc};

  &:focus {
    outline: none;
  }
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 40px;
`;

export const StyledThumb = styled.div`
  height: 34px;
  line-height: 40px;
  width: 34px;
  text-align: center;
  background-color: #00DAFF;
  border-radius: 50%;
  cursor: grab;
  outline: none;
  border: 1px solid var(--white);
  top: 3px;
`;

export const StyledTrack = styled.div`
  top: 50%;
  height: 1rem;
  transform: translate(0, -50%);
  background: var(--white);
  border-radius: 999px;
`;

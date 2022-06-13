import styled from "styled-components/macro";
import ReactSlider from "react-slider";
import CurrencyInput from "react-currency-input-field";
import { DesktopWrapper, MobileWrapper } from "styles/layout";

export const DesktopWr = styled(DesktopWrapper)`
  margin: 0 auto;
  display: block;
`;

export const MobileWr = styled(MobileWrapper)`
  display: block;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0px 10px 7.5rem;
  font-size: 1.6rem;

  @media (min-width: 481px) {
    padding: 0;
  }

  @media (max-width: 481px) {
    padding: 15px 30px 7.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

export const Toggles = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:first-of-type {
    margin-right: 2rem;
  }
`;

export const Toggle = styled.div`
  border: 1px solid
    ${(props) => (props.checked ? "var(--blue)" : "var(--superLightGrey)")};
  padding: 1rem;
  border-radius: 1.5rem;
  flex: 1;
  transition: all 0.25s ease-in-out;

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ToggleImage = styled.img`
  width: 100%;
  max-width: 176px;

  @media (min-width: 481px) {
    max-width: 100%;
  }
`;

export const LikeToView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icon = styled.img`
  width: 36px;
  /* add margin-bottom if text is reverted
  (like to view + price per like) */
  /* margin-bottom: 1rem; */
`;

export const Amount = styled.p`
  color: var(--green);
  margin-top: 1.5rem;
`;

export const LightText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: #fff;
`;

export const Text = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.6rem;
`;

export const Check = styled.div`
  display: flex;
  border: 3px solid
    ${(props) => (props.checked ? "var(--blue)" : "var(--baseGrey)")};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Dot = styled.span`
  width: 1rem;
  height: 1rem;
  background-color: var(--blue);
  border-radius: 50%;
  margin-right: ${(props) => (props.mr ? "5px" : 0)};
`;

export const Info = styled.p`
  margin: ${(props) => (props.margin ? "3rem 0" : 0)};
  font-size: 1.6rem;
  line-height: 2.5rem;
`;

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
  text-align: center;
  border-radius: 0;
  background-color: ${({ theme }) => theme.bgc};

  &:focus {
    outline: none;
  }
`;

export const StyledSlider = styled(ReactSlider)`
  width: 85%;
  height: 1rem;
`;

export const StyledThumb = styled.div`
  height: 22px;
  line-height: 22px;
  width: 22px;
  text-align: center;
  background-color: #fff;
  border-radius: 50%;
  cursor: grab;
  outline: none;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledTrack = styled.div`
  top: 50%;
  height: 1rem;
  transform: translate(0, 10%);
  background: #b0f0ff;
  background: ${(props) =>
    props.index === 1
      ? `linear-gradient(90deg, var(--lightBlue) ${
          0 - props.value - 25
        }%, var(--blue) 100%)`
      : `linear-gradient(90deg, var(--lightBlue) 0%, var(--blue) 125%)`};
  border-radius: 999px;
`;

export const Note = styled.p`
  margin-bottom: 3rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  color: red;
`;

// Previous YouTube version
// export const VideoWrapper = styled.div`
//   position: relative;
//   padding-bottom: 56.25%; /* 16:9 */
//   height: 0;
//   overflow: hidden;
//   max-width: 100%;
//   min-height: 236px;
//   /* padding-top: 25px; */

//   & iframe {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//   }
// `;

export const VideoWrapper = styled.div`
  & > video {
    width: 100% !important;
    height: auto !important;
  }
`;

export const PurchaseHeader = styled.h3`
  text-align: center;
  font-weight: bold;
  margin: 2rem 0;
`;

export const PurchaseInfo = styled.div`
  border-radius: 1.5rem;
  align-self: center;
  padding: 0 2.5rem;
  margin-bottom: 2rem;

  & > p {
    text-align: left;
    display: flex;
    align-items: center;
  }
`;

export const Separator = styled.div`
  // border-bottom: 15px solid #f4f4f4;
  // height: 10px;
  // margin-bottom: 6rem;
`;

export const CheckWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CheckImage = styled.img`
  width: 20px;
  height: 20px;
`;

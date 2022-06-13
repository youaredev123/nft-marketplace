import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  padding-bottom: 100%;
  border-radius: 4px;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
  box-shadow: none;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const RelicImageContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: none;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const HiddenImageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 4px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: none;
  position: relative;
  display: block;
  &:hover {
    cursor: pointer;
  }
`;

export const HiddenImageNote = styled.div`
  display: block;
  padding-left: 20px;
  vertical-align: middle;
  width: calc(100% - 180px);
  text-decoration: none;
  color: black;
  margin: auto;
`;

export const RelicCircleContainer = styled.div`
    position: absolute;
    bottom: 22px;
    color: rgb(16, 211, 16);
    background-color: rgba(0, 0, 0, 0.6);
    width: 54px;
    height: 54px;
    padding: 10px 0;
    margin: auto;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;
    justify-content: center;

    span {
        color: white;
        font-size: 10px;
    }
`;

export const HiddenImageAward = styled.div`
  position: absolute;
  bottom: 0px;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  width: 80%;
  border-radius: 35px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  word-wrap: break-word;
  line-height: 14px;
  margin: 1rem 0;
  transition: all 0.25s ease-in-out;

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }

  @media (min-width: 481px) {
    bottom: 20px;
    font-size: 1.6rem;
    line-height: 30px;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0.5, 0.5, 0.5, 0.4);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${(props) => props.isBig ? "20px" : "inherit"};
`;

export const DiscoverRelicContainer = styled.div`
  div {
    color: #10D310;
    padding-top: 15px;
  }
`;

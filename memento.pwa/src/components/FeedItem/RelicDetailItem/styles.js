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

export const HiddenImageContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  background-image: url(${(props) => props.url});
  background-size: 90px 90px;
  box-shadow: none;
  border: 1px solid #dddddd;
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

export const HiddenImageAward = styled.div`
  display: block;
  vertical-align: middle;
  text-align: center;
  color: green;
  width: 90px;
  margin: auto;
  text-decoration: none;
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
  font-size: ${(props) => props.isBig ? "40px" : "inherit"};
`;
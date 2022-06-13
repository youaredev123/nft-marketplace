import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";

export const Wrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 481px) {
    border-radius: 6px;
  }
`;

export const PictureWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`;

export const Avatar = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  /* css hack for square image, using from ImageItem */
  padding-bottom: 100%;
  border-radius: 4px;
  background-image: ${(props) => props.urls.map((url) => `url(${url})`).join()};
  background-position: center center;
  background-size: cover;
  transition: all 0.25s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }

  @media (min-width: 481px) {
    border-radius: 6px;
  }
`;

export const Username = styled.p`
  position: absolute;
  bottom: 0px;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  width: 80%;
  border-radius: 35px;
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

export const Link = styled(RouterLink)`
  text-decoration: none;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 1.6rem;
  color: #fff;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

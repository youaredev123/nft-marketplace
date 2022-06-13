import styled from "styled-components/macro";

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

  @media (min-width: 481px) {
    border-radius: 6px 6px 6px 6px;
  }
`;

export const OriginallyPrivate = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 1rem;

  @media (min-width: 481px) {
    width: 2rem;
  }
`;

export const Lock = styled.img`
  width: 100%;
`;

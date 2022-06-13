import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  padding-bottom: 100%;
  border-radius: 4px;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  box-shadow: none;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

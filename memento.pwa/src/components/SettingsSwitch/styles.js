import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Handle = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background-color: #fff;
  pointer-events: none;
  &.on {
    left: 20px;
  }
  transition: 0.3s;
  ${({ shouldLightUp }) => shouldLightUp && `
    &.on {
      background-color: #10a5f5;
    }
  `};
`;

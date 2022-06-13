import styled from "styled-components";

export const CloseIconContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;
export const FullImageIconContainer = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

export const TapButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  border: none;
  background: transparent;
`;

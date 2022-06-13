import styled from "styled-components";

export const PopUpWrapper = styled.div`
  z-index: 9999999999999;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100vh;
  transition: background-color .2s;
  
  display: flex;
  justify-content: center;
`

export const PopUpStyle = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  transition: height .2s;
  border-radius: 12px 12px 0 0;
  width: 100%;
  max-width: 480px;
  background-color: ${({theme}) => theme.popUpBgc};
  z-index: 9999999999999;
  display: flex;
  align-items: center;
  
  & div {
    margin-left: 14px;
    font-size: 1.5rem;
    font-family: var(--font-body);
    font-weight: var(--font-weight-normal);
  }
`

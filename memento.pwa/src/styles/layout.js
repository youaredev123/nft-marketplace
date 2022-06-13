import styled from "styled-components";

export const DesktopWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 480px){
    display: none;
  }
`

export const MobileWrapper = styled.div`
  height: 100%;
  width: 100%;

  @media (min-width: 481px){
    display: none;
  }
`

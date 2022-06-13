import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  overflow: hidden;
`;

export const ProgressBarContainerHidden = styled.div`
  width: 100%;
  transition: opacity .2s;
`

export const ProgressBarProgressInfinite = styled.div`
  height: 10px;
  width: 100%;
  animation: colorAnimation 0.9s infinite linear;
  background-image: linear-gradient(to left, #00dbff, #13cefc, #12c2fa, #12baf9, #11adf6, #10a5f5, #11adf6, #12baf9, #12c2fa, #13cefc, #00dbff);
  
  @keyframes colorAnimation {
    0% {
      background-position: -500px;
    }
    100% {
      background-position: 500px;
    }
  }
`;

/*


*
* */
import styled from "styled-components";
import { createGlobalStyle} from "styled-components"

export const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--white);

  hr {
    width: 100%;
    height: 15px;
    background-color: ${({theme}) => theme.notificationBorderBottom};
    border: none;
    padding: 1px;
    display: block;
    margin: 30px 0;
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 137px;
  position: relative;
  margin-bottom: 20px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  div {
    position: absolute;
    color: white;
    font-size: 28px;
    font-weight: bold;
    left: 20px;
    bottom: 15px;
  }
`;


export const PageContainer = styled.div`
  position: relative;
  height: calc(100% - 40px);
`;

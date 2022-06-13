import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
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

  .next-btn {
    padding: 17px;
    font-size: 18px;
    width: 90%;
    background: transparent linear-gradient(180deg,#00dbff 0%,#10a5f5 100%) 0 0 no-repeat padding-box;
    text-align: center;
    color: white;
    box-shadow: 0px 0px 20px #10a5f559;
    border-radius: 35px;
    text-decoration: none;
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 137px;
  position: relative;

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

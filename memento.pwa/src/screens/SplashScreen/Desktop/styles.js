import styled from "styled-components";
import { Link } from "react-router-dom";

export const Info = styled.div`
  position: absolute;
  width: 60%;
  left: 20%;
  top: 25%;
`;

export const InfoContainer = styled.div`
  width: 65%;
  position: relative;
  overflow: hidden;

  & > img {
    height: 100%;
    position: absolute;
  }
`;
export const InfoText = styled.div`
  font-family: "Nunito Sans",sans-serif;
  font-size: 50px;
  font-weight: 800;
  line-height: 60px;
  letter-spacing: 0;
  color: #FFFFFF;
  text-shadow: 0 3px 6px #00000038;

  @media (max-width: 1200px){
    font-size: 35px;
  }

  @media (max-width: 768px){
    font: normal normal bold 20px/30px Roboto;
  }
`;

export const InfoLogo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font: normal normal bold 43px/57px Roboto;
  letter-spacing: 0;
  color: #FFFFFF;

  & img {
    height: 150px;
    margin-right: 20px;
  }
  margin-bottom: 15px;

  @media (max-width: 1200px){
    font-size: 35px;

    & img {
      height: 150px;
    }
  }

   @media (max-width: 768px){
    & img {
      height: 75px;
    }
  }
`;

export const ActionContainer = styled.div`
  width: 50%;
  height: 100%;
  background: var(--white);
  position: relative;
`;

export const Actions = styled.div`
  position: absolute;
  width: 66.666%;
  left: 13%;
  top: 25%;

  @media (max-width: 600px){
    width: 80%;
    left: 10%;
  }
`;

export const ActionInfo = styled.div`
  & h2 {
    font-family: "Nunito Sans",sans-serif;
    font-weight: bold;
    font-size: 40px;
    line-height: 53px;
    letter-spacing: 0;
    color: #000000;
    margin-bottom: 2.5%
  }

  & div {
    font-family: "Nunito Sans", sans-serif;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0;
    color: #121212;
  }

  margin-bottom: 15%;

  @media (max-width: 1200px){
    & h2 {
      font-size: 35px;
    }
  }
`;

export const Buttons = styled.div`
  .blue {
    background-image: linear-gradient(to right, #4cdeff, #39a5f5);
    color: white;
    border: none;
  }

  .blue:hover {
    background: transparent linear-gradient(106deg, #00AECB 0%, #0B91D9 100%) 0 0 no-repeat padding-box;
    box-shadow: 0 0 20px #10A5F559;
  }

  .disable {
    background: #D1DCDE 0 0 no-repeat padding-box;
  }

  & > a {
    text-decoration: none;
    font-size: 16px;
  }
`;

export const Button = styled.div`
  text-decoration: none;
  height: 56px;
  border: 1px solid #AFAFAF;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.75%;
  cursor: pointer;
  font: normal normal medium 16px/21px Roboto;
`;
export const LoginContainer = styled.div`
  position: relative;

  & > img {
    position: absolute;
    top: -63px;
    width: 61px;
    height: 21px;
    cursor: pointer;
  }
`;

export const LoginText = styled.div`
  text-align: left;
  font: normal normal bold 40px/53px Roboto;
  font-family: "Nunito Sans", sans-serif;
  letter-spacing: 0;
  color: #000000;
`;

export const InputContainer = styled.div`
  padding: 8px 0;
  margin-top: 36px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: normal normal normal 16px/21px Roboto;
  letter-spacing: 0;
  color: #000000;
  margin-top: 7px;
  margin-bottom: 52px;

  & input {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

`;

export const ForgotPassword = styled(Link)`
  font: normal normal medium 16px/21px Roboto;
  letter-spacing: 0;
  color: #10A5F5;
  text-decoration: none
`;

export const MySelect = styled.div`
  margin-top: 28px;
  margin-bottom: 56px;
`;

export const MyOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 88px;
  border-radius: 10px;
  margin-bottom: 24px;
  border: 1px solid ${({ active }) => active ? '#10A5F5' : '#DBDBDB'};
  transition: All .2s;
`;

export const MyOptionContent = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  margin-left: 30px;

  & > img {
    width: 44px;
    height: 44px;
  }

  & > * {
    margin-right: 15px;
  }

  @media (min-width: 481px) and (max-width: 700px){
    & > img {
     display: none;
    }
  }
`;

export const TextContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 45px;
`;

export const Text = styled.div`
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0;
  margin-bottom: 30px;
`;

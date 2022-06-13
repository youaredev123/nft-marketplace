import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderSpace = styled.div`
    margin-top: 65px;
    width: 100%;
    height: 0;
    display: flex;

    @media (max-width: 480px){
        display: none;
    }
`;

export const HeaderHide = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`

export const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  padding: 0 15px;
  top: 0;
  background: ${({ theme }) => theme.navBgc};
  box-shadow: ${({ theme }) => theme.headerBoxShadow};
  z-index: 2;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  width: 100%;
  margin: 0;
  padding: 0 6.2rem;

  @media (max-width: 768px){
    padding: 0 4rem;
  }
`

export const HeaderSearch = styled.div`
  text-decoration: none;
  display: flex;
  width: 62%;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px){
    width: 50%;
  }

  .logo {
    flex: 1 auto;
  }

  .input-search-wrapper {
    flex: 1 10%;
  }
`

export const Logo = styled.div`
  display: flex;
  margin-right: 10%;
  color: ${({ theme }) => theme.text};
  align-items: center;

  & img {
    margin-right: 10px;
    width: 41px;
    height: 41px;
  }

  @media (max-width: 768px){
    margin-right: 0;
    & img {
      width: 30px;
      height: 30px;
    }

    & svg {
      width: 37px;
      height: 37px;
    }
  }
`

export const Text = styled.div`
  font: normal normal bold 2.5vw Roboto;

  @media (max-width: 768px){
    font-size: 20px;
    display: none;
  }

  @media (min-width: 769px){
    font-size: 25px;
  }
`

export const InputWrapper = styled.div`
  flex: 1 auto;
  margin: 0rem 0rem 0rem 3.7rem;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputHeaderBorderColor};
  border-radius: 40px;
  height: 34px;
  display: flex;
  align-items: center;
  cursor: text;

  & #Ellipse_47 {
    stroke: rgb(198, 198, 198);
  }

  & #Line_74 {
    stroke: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    width: 70%;
  }
`

export const Input = styled.input`
  width: 90%;
  margin: 0 auto;
  border: 0;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.text};
`

export const Activity = styled.div`
  position: relative;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 450px;

  @media (max-width: 1200px){
    width: 40%;
  }

  @media (max-width: 768px){
    width: 55%;
  }

  .activeNavLink{
    & #Ellipse_47 {
      stroke: #10a5f5;
    }

    & #Line_74 {
      stroke: #10a5f5;
    }

    & > * {
      color: #10a5f5 !important;
    }
  }
`

export const ButtonLink = styled.div`
  border: 0;
  border-radius: 50%;
  width: ${({ theme }) => theme.avaDM};
  height: ${({ theme }) => theme.avaDM};
  :hover {
    cursor: pointer;
  }
  :active,
  :focus {
    outline: none;
  }
  > * {
    border-radius: 50%;
    width: 38px;
    height: 38px;
  }
  & img {
    border: ${({ theme, isActive }) => isActive ? theme.DMBorderAva : "2px solid transparent"};
  }
`

export const Button = styled.button`
  background: transparent linear-gradient(180deg, #00DBFF 0%, #10A5F5 100%) 0 0 no-repeat padding-box;
  border-radius: 40px;
  border: none;
  height: 33px;
  text-align: center;
  font: normal normal medium 16px/21px Roboto;
  font-size: 14px;
  letter-spacing: 0;
  color: #FFFFFF;
  width: 118px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: transparent linear-gradient(106deg, #00AECB 0%, #0B91D9 100%) 0 0 no-repeat padding-box;
  }

  @media (max-width: 1024px){
    font-size: 14px;
    margin-left: 25px;
  }
`
export const UserMenu = styled.div`
  display: ${({ styleState }) => styleState ? 'flex' : 'none'};
  flex-direction: column;
  top: 59px;
  margin-left: -155px;
  width: 200px;
  height: 171px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #0000001a;
  background-color: #EDEDED;
  opacity: 0;
  transition: 0.3s;
  position: absolute;
  z-index: 50;
  font-size: 1.8rem;
  :before {
    border: 14px solid transparent;
    border-bottom-color: #f7f7f7;
    position: absolute;
    bottom: 100%;
    right: 10px;
    content: '';
  }
  :after {
    border: 11px solid hsl(0deg 0% 100% / 0%);
    border-bottom-color: #ffffff;
    position: absolute;
    bottom: 99%;
    right: 13px;
    content: '';
  }
  & > * {
    font-size: 1.8rem;
  }
`
export const LinkToProfile = styled(Link)`
  height: 56px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 10px 10px 0px 0px;
  text-decoration: none;
  color: black;
  padding: 19px 115px 15px 28px;
  :hover {
    background-color: #f7fcff;
  }
`
export const LinkToSettings = styled(Link)`
  height: 56px;
  margin: 1px 0px 1px 0px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  text-decoration: none;
  color: black;
  padding: 19px 115px 15px 28px;
  :hover {
    background-color: #f7fcff;
  }
`
export const LogOut = styled.div`
  height: 56px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 10px 10px;
  text-decoration: none;
  color: var(--red);
  padding: 18px 92px 15px 28px;
  :hover {
    cursor: pointer;
  }
`
export const MarketPlaceIcon = styled.img`
  width: 23px;
  height: 30px;
  display: flex;
  margin-right: 20px;
`;

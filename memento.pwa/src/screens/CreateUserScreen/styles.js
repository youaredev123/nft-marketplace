import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileAvatar = styled(Avatar)`
  position: relative;
`;

export const EditProfileLink = styled(Link)`
  color: var(--blue);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100vh;

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
`;

export const EditProfileCircle = styled.div`
  position: absolute;
  top: -5px;
  right: 15px;
  height: 30px;
  -webkit-box-shadow: 3px 6px 10px #0000001a;
  box-shadow: 03px 6px 10px #0000001a;
  -moz-border-radius: 190px;
  -webkit-border-radius: 190px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue);

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const Label = styled.label`
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 6px;
  margin: 0 auto;
  width: 93%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  @media (min-width: 481px){
    margin: 44px 0 24px 0;
    width: 100%;
    background: #FFFFFF 0 0 no-repeat padding-box;
    border: 1px solid #DBDBDB;
    border-radius: 4px;
  }
`;

export const FileInputText = styled.div`
  color: #000000;
  margin-left: 20px;

  @media (min-width: 481px) and (max-width: 768px){
    margin-left: 10px;
    text-align: center;
  }
`;

export const FileInputTextMain = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;

  @media (max-width: 1200px){
   font-size: 17px;
  }

  @media (min-width: 481px) and (max-width: 768px){
    margin-bottom: 0;
  }
`;

export const FileInputTextDesc = styled.div`
  font-weight: 400;
  font-size: 16px;

  @media (max-width: 1200px){
    font-size: 14px;
  }

  @media (min-width: 481px) and (max-width: 768px){
    display: none;
  }
`;
export const ButtonCreateUser = styled.div`
  width: 80px;
`;

export const LinkToTeemsOfServiceWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  line-height: 22px;
  margin: 0 17px;
  text-align: center;
`;

export const LinkToTeemsOfService = styled.div`
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

export const Wrapper = styled.div`
  width: 90%;
`;

export const FloatingButton = styled.button`
  position: absolute;
  width: 30px;
  height: 60px;
  top: 0;
  left: 20px;
  z-index: 1;
  background-color: transparent;
  padding: 0;
  outline: none;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const Arrow = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%) rotate(45deg);
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
`;

export const Check = styled.div`
  display: flex;
  border: 3px solid
    ${(props) => (props.checked ? "var(--blue)" : "var(--baseGrey)")};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: var(--blue);
  border-radius: 50%;
`;

export const Info = styled.p`
  margin: ${(props) => (props.margin ? "3rem 0" : 0)};
  font-size: 1.6rem;
  line-height: 2.5rem;
`;

export const NudityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

export const MainLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

export const AgeVerification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

export const Age = styled.p`
  font-size: 2.2rem;
  color: #fff;
  font-weight: bold;
`;

export const NudityContent = styled.div``;

export const NudityToggles = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const NudityToggle = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.25s ease-in-out;

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }

  &:first-of-type {
    margin-right: 1rem;
  }
`;

export const ToggleLabel = styled.p`
  margin-right: 1rem;
  font-size: 1.6rem;
`;

export const Warning = styled.p`
  visibility: ${(props) => (props.nudity ? "visible" : "hidden")};
  color: var(--red);
  line-height: 1.5;
`;

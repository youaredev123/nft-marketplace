import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "../../../../components/Avatar";

export const Wrapper = styled.div`
  display: block;

  @media (max-width: 480px){
    display: none;
  }
`;

export const ProfileTile = styled.div`
  box-shadow: 0 6px 10px #0000001a;
  background: ${({ theme }) => theme.profileColor};
  color: ${({ theme }) => theme.text};
  margin: -120px 18px 0 18px;
  border-radius: 6px;
  text-align: center;
  padding: 1.8em 1.7em 2.4em 1.7em;
  position: relative;

  @media (min-width: 481px){
    max-width: 750px;
    width: 100%;
    margin: -130px auto 3rem auto;
  }
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled(Avatar)`
  border: 3.7px solid ${({ theme }) => theme.bgc};
  margin-top: -70px;
  position: relative;
  background-color: ${({ theme }) => theme.profileColor};

  @media (min-width: 481px){
    margin-top: -100px;
    border: 5px solid ${({ theme }) => theme.bgc};
  }
`;

export const ProfileName = styled.h3`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 2.5rem;
  line-height: 32px;
  margin-bottom: 4px;

  @media (min-width: 481px){
    font-size: 3.2rem;
    line-height: 5rem;
    margin-bottom: 1rem;
  }
`;

export const ProfileBio = styled.p`
  font-size: 1.6rem;
  font-weight: var(--font-weight-light);
  line-height: 25px;
  color: var(--grey);
  word-break: break-word;
`;

export const EditProfileLink = styled(Link)`
  font-size: 1.7rem;
  color: var(--blue);
  text-decoration: none;
  font-weight: 500;
  -webkit-tap-highlight-color: transparent;
`;

export const ProfileLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0;
  color: #10A5F5;
`

export const ProfileMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 481px){
    width: 60%;
    margin: 0 auto;
  }
`;

export const ProfileMetric = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const ProfileNonLinkMetric = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const MetricValue = styled.h4`
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  color: ${({ theme }) => theme.text};
  margin-bottom: 6px;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }

  @media (min-width: 769px){
    font-size: 19px;
  }
`;

export const MetricLabel = styled.span`
  font-size: 1.6rem;
  font-weight: var(--font-weight-light);
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }

  @media (min-width: 769px){
    color: #939393;
    font-size: 16px;
    font-weight: 400;
  }
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const EditProfileCircle = styled.div`
  position: absolute;
  top: -10px;
  right: 0px;
  height: 30px;
  width: 30px;
  -webkit-box-shadow: 3px 6px 10px #0000001a;
  box-shadow: 03px 6px 10px #0000001a;
  -moz-border-radius: 190px;
  -webkit-border-radius: 190px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue);
  > * {
    &:hover,
    &:focus {
      cursor: pointer;
    }
  }
  &:hover,
  &:focus {
    cursor: pointer;
  }

  @media (min-width: 769px){
    top: -0px;
  }
`;

export const FavouritesContainer = styled.div`
  position: absolute;
  right: 1.7em;
  top: 1.7em;
  > svg {
    position: absolute;
    top: -43px;
    right: -23px;
  }
  > a {
    position: relative;
  }
`;

import styled from "styled-components";
import Avatar from "components/Avatar";
import { Link } from "react-router-dom";

export const BtnGroupEdit = styled.div`
  display: flex;
  width: 410px;
  float: right;
  margin-top: 2rem;
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled(Avatar)`
  border: 3.7px solid var(--white);
  margin-top: -70px;
  position: relative;

  @media (min-width: 481px){
    margin-top: -80px;
    border: 5px solid var(--white);
  }

  @media (min-width: 769px){
    margin-top: -80px;
    border: 5px solid var(--white);
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
  top: 90px;
  right: 10px;
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
  background-color: var(--white);
  border: 1px solid var(--blue);
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
`;

export const ProfileName = styled.h3`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 2.5rem;
  line-height: 32px;
  margin-bottom: 4px;

  @media (min-width: 769px){
    font-size: 35px;
  }
`;

export const ProfileBio = styled.p`
  font-size: 1.5rem;
  font-weight: var(--font-weight-light);
  line-height: 24px;
  color: var(--grey);
  word-break: break-word;
`;

export const SubmitButton = styled.button`
  background: transparent linear-gradient(106deg ,#00DBFF 0%,#10A5F5 100%) 0 0 no-repeat padding-box;
  box-shadow: 0 0 20px #10a5f559;
  border-radius: 50px;
  margin: 0px 10px 0px 10px;
  border: none;
  height: 46px;
  text-align: center;
  font: normal normal medium 16px/21px Roboto;
  font-size: 14px;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  color: #FFFFFF;
  width: 50%;
  cursor: pointer;
  outline: none;
`;

export const InvitationTitle = styled.h3`
  width: 100%;
`;

export const TweetButton = styled.a`
  width: auto;
  padding: 0 4rem;
  background: transparent linear-gradient(106deg ,#00DBFF 0%,#10A5F5 100%) 0 0 no-repeat padding-box;
  box-shadow: 0 0 20px #10a5f559;
  border-radius: 40px;
  margin: 0px 10px 0px 10px;
  border: none;
  height: 46px;
  text-align: center;
  font: normal normal medium 16px/21px Roboto;
  font-size: 14px;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  line-height: 46px;
  text-decoration: none;
`

export const DiscardButton = styled.button`
  background: #fff;
  border-radius: 50px;
  margin: 0px 10px 0px 10px;
  border: 1px solid #AFAFAF;
  height: 46px;
  text-align: center;
  font: normal normal medium 16px/21px Roboto;
  font-size: 14px;
  letter-spacing: 0;
  width: 50%;
  cursor: pointer;
  outline: none;

  & > a {
    color: #000;
    text-decoration: none;
  }
`;

export const ProfileMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 769px){
    max-width: 50%;
    margin: 0 auto 30px auto;
    min-width: 336px;
  }

  @media (min-width: 481px){
    margin-bottom: 30px;
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
    font-size: 20px;
  }
`;

export const MetricLabel = styled.span`
  font-size: 1.5rem;
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

export const FavouritesContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  > svg {
    position: absolute;
    top: -43px;
    right: -23px;
  }
  > a {
    position: relative;
  }
`;

export const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  & > div {
    margin-top: 28px;
    height: 180px;

    & > div {
      background-color: #8e9499;
    }
  }

`;

const ActionsBase = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const EditCover = styled(ActionsBase)`
  top: 16px;
  right: 16px;

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
`;

export const ProfileTile = styled.div`
  background: ${({ theme }) => theme.bgc};
  color: ${({ theme }) => theme.text};
  width: 100%;
  text-align: center;
  padding: 1.5em 0;

  @media (max-width: 768px){
    max-width: 90%;
    margin: -40px auto 0 auto;
    padding-left: 10px;
  }
`;

export const ProfileUserName = styled.div`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  margin-top: 27px;
  margin-bottom: 51px;
  font-size: 30px;
  height: 26px;
`;

export const TabContentWrapper = styled.div`
  margin: 5rem auto;
  background: ${({ theme }) => theme.bgc};
  color: ${({ theme }) => theme.text};
`

export const SelectWalletType = styled.div`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme?.text || "var(--black)"};
  padding: 5rem;
  min-height: 5.6rem;
  font-size: 1.6rem;
  position: relative;
  border: 1px solid ${({theme}) => theme.copyLinkIconBgc};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3rem;
  cursor: pointer;
  border-radius: 6px;

  &:hover, &.active {
    border-color: var(--lightBlue);
  }

  > svg {
    position: relative;
    display: flex;
  }
`;

// --- Invitation Tab ---
export const TwitterText = styled.p`
  color: ${({ theme }) => theme?.text};
  line-height: 2.5rem;
  font-weight: var(--font-weight-bold);
  text-align: center;
  font-size: 1.4rem;
`;
export const InvitationImg = styled.img`
  object-fit: contain;
  margin: 5px 15px 13px 0px;
  margin: 0 auto;
  max-height: 300px;
`;
export const CopyButton = styled(SubmitButton)`
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 1.4rem 7rem;
`;
export const CopyLink = styled.div`
  display: flex;
  background: ${({ theme }) => theme.copyLinkInSettingBgc};
  border-radius: 1000px;
  width: 96%;
  margin: 0 auto;
  padding: 1.27rem 0.1rem 1.27rem 2.5rem;
  overflow: hidden;

  & svg {
    cursor: pointer;
  }

  & svg > g {
    fill: ${({ theme }) => theme.copyLinkIconBgc};
  }
`;
export const LinkInput = styled.input`
  border: 0;
  width: calc(100% - 40px);
  margin-left: 5px;
  background: none;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.copyLinkText};

  &:focus {
    outline: none;
  }
`;

// --- Select Wallet ---
export const MySelect = styled.div`
  margin-top: 28px;
  margin-bottom: 56px;
`

export const MyOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 88px;
  border-radius: 6px;
  margin-bottom: 24px;
  border: 1px solid ${({active}) => active ? '#10A5F5' : '#DBDBDB'};
  transition: All .2s;
`

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
    margin-right: 35px;
  }

  @media (min-width: 481px) and (max-width: 700px){
    & > img {
     display: none;
    }
  }
`

// --- Dark Mode ---
export const DarkModeSelect = styled(MySelect)`
  display: flex;
  justify-content: space-evenly;
  height: auto;
`;

export const DarkModeSelectOption = styled(MyOption)`
  width: 33%;
  height: auto;
  margin: 0;
  cursor: pointer;
  padding: 2rem 0;
`;

export const DarkModeSelectContent = styled(MyOptionContent) `
  margin-left: 2rem;
`

export const DarkModeImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 3rem 0;

  img {
    width: auto;
    height: auto;
    max-width: 33%;
  }
`;

// --- Edit Profile ---
export const EditProfileInputWrapper = styled.div`
  width: 70%;
  margin: -2rem auto 3.5rem auto;
`;

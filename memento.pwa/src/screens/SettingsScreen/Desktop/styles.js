import styled from "styled-components";

export const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  min-height: 67px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
 border-left: 2px solid transparent;

  &:hover, &.active {
    background: #f7fcff 0% 0% no-repeat padding-box;
    background: ${({ theme }) => theme.toggleBorder};
    border-left: 2px solid #10A5F5;
    color: ${({ theme }) => theme.text};
  }
`;

export const CopyLink = styled.div`
  display: flex;
  background: ${({ theme }) => theme.copyLinkInSettingBgc};
  border-radius: 1000px;
  width: 94%;
  margin: 0 auto;
  padding: 1.27rem 1rem 1.27rem 4rem;
  overflow: hidden;

  & svg {
    cursor: pointer;
  }

  & svg > g{
    fill: ${({ theme }) => theme.copyLinkIconBgc};;
  }
`;

export const LinkInput = styled.input`
  border: 0;
  width: calc(100% - 65px);
  margin-left: 15px;
  background: none;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.copyLinkText};

  &:focus {
    outline: none;
  }
`;

export const SettingsLink = styled.a`
  color: ${(props) => props.color || "var(--blue)"};
  text-decoration: none;
  font-weight: var(--font-weight-normal);
`;

export const SettingsSwitch = styled.img`
  cursor: pointer;
`;

export const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 755px;
  border: 1px solid ${({theme}) => theme.borderLineColor};
  border-radius: 6px;

  a {
    font-size: 1.6rem;
  }
`;

export const TwitterText = styled.span`
  color: #1da1f2;
  line-height: 2.5rem;
`;

export const TwitterLink = styled.a`
  -webkit-tap-highlight-color: transparent;
`;

export const InvitationImg = styled.img`
  object-fit: contain;
  height: 150px;
  margin: 5px 15px 13px 0px;
`;

export const InvitationImgWrapper = styled.div`
  text-align: center;
`;

export const Spacer = styled.div`
  background-color: #afafaf4d;
  height: 1px;
  width: 100%;
  margin: 1rem 0;
`;

export const TabContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 9.5rem);
  position: relative;
  margin: 0 8rem 0 4.5rem;
  overflow: hidden;
  padding-top: 4.5rem;
  h3 {
    font-size: 2.9rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-align: center;
    color: ${({ theme }) => theme.text};
  }
`;

export const EditProfile = styled.div`
  overflow: hidden;
  padding-top: 0.5rem;
  height: 100%;
  width: 100%;

    & > span {
      color: ${({ theme }) => theme.text};
      margin-right: 5.6rem;
    }
`;

export const SettingBar = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    font-size: 1.8rem;
    font-weight: 500;
   }
  & a {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

export const DesktopWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  padding-top: 18px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const SettingContainer = styled.div`
  display: flex;
  height: 100%;
  background: ${({ theme }) => theme.bgc};
  color: ${({ theme }) => theme.text};
`;

export const ShadowBox = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgc};
  color: ${({ theme }) => theme.text};
  margin-left: 15px;
  border: 1px solid ${({theme}) => theme.borderLineColor};
  border-radius: 6px;

  @media (max-width: 480px) {
    border-left: none;
  }
`;

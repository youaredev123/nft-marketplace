import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const DarkMode = styled.div`
  width: 58px;
  height: 25px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

export const SettingsLink = styled.a`
  color: ${(props) => props.color || "var(--blue)"};
  text-decoration: none;
  font-weight: var(--font-weight-normal);
`;

export const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 10px 15px 10px 1.5rem;
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

export const RouterLink = styled(Link)`
  color: ${(props) => props.color || "var(--blue)"};
  text-decoration: none;
  font-weight: var(--font-weight-normal);
  display: flex;
  align-items: center;
`;

export const NewIcon = styled.img`
  margin-left: 5px;
  height: 16px;
`;

export const Title = styled.span`
  cursor: pointer;
  display: inline-block;
  padding: 1px 4px 0 2px;
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
  line-height: 21px;
  color: ${({ theme }) => theme.text};
  margin: 0;
  -webkit-tap-highlight-color: transparent;
`;

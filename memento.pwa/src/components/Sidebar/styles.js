import styled from "styled-components";
import Avatar from "components/Avatar";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.div`
  margin: 0 auto;

  @media (max-width: 1000px){
    display: none;
  }
`;

export const CoverImage = styled.div`
  overflow: hidden;
  background-image: url(${(props) => props.url});
  background-size: ${(props) => props.hasImage ? 'cover' : 'contain'};
  background-position: ${(props) => props.hasImage ? 'center center' : 'center -27px'};
  background-repeat: no-repeat;
  border-radius: 6px;
  margin: ${(props) => props.hasImage ? '0px 0px -64px 0px' : '0px 0px 0px 0px'};
  height: ${(props) => props.hasImage ? '170px' : '234px'};
`;

export const Earned = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: 0;
  display: block;
  text-align: left;
  font-size: 1.5rem;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-body);
`;

export const ProfileTile = styled.div`
  background: ${({ theme }) => theme.profileColorAvatar};
  color: ${({ theme }) => theme.text};
  margin: -44px -0 0 0;
  text-align: center;
  padding: 3rem calc(3.7rem - 15px) 2rem calc(3.7rem - 15px);
  position: relative;
  max-width: 316px;

  @media (max-width: 768px) {
    padding: 0 4rem;
  }
`;

export const Divider = styled.div`
  background-color: ${({theme}) => theme.copyLinkIconBgc};
  height: 1px;
  margin: 2rem 0;
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled(Avatar)`
  border: 5px solid ${({ theme }) => theme.bgc};
  margin-top: -86px;
  position: relative;
`;

export const ProfileName = styled.h3`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 2.5rem;
  text-align: left;
`;

export const ProfileBio = styled.p`
  font-size: 1.4rem;
  font-weight: var(--font-weight-light);
  line-height: 25px;
  color: var(--grey);
  word-break: break-word;
  text-align: left;
`;
export const ProfileContainer = styled.div`
  background: ${({ theme }) => theme.backgroundBoxColor};
  position: fixed;
  height: 90vh;
  overflow-y: auto;
  max-width: 100%;
  text-align: left;
  border: 1px solid ${({theme}) => theme.borderLineColor};
  border-radius: 6px;
`;
export const DesktopWrapper = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`;
export const ProfileMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
`;
export const ProfileMetric = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  align-items: center;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
export const MetricValue = styled.h4`
  font-size: 1.5rem;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-body);
  color: var(--blue);
  margin-right: 6px;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
export const MetricLabel = styled.span`
  font-size: 1.5rem;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-body);
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
export const Heading = styled.h4`
    text-align: left;

    a {
        color: {blue};
        font-family: var(--font-headings);
        font-weight: var(--font-weight-bold);
        font-size: 2rem;
        text-decoration: none;
    }
`;

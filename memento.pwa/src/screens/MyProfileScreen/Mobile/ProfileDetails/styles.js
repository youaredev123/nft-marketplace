import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "../../../../components/Avatar";

export const ProfileTile = styled.div`
  box-shadow: 0 6px 10px #0000001a;
  background-color: ${({ theme }) => theme.profileColor};
  color: ${({ theme }) => theme.text};
  margin: -120px 18px 0 18px;
  border-radius: 6px;
  text-align: center;
  padding: 1.7em;
  position: relative;
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
`;

export const ProfileName = styled.h3`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 2.5rem;
  line-height: 32px;
  margin-bottom: 4px;
`;

export const ProfileBio = styled.p`
  font-size: 1.5rem;
  font-weight: var(--font-weight-light);
  line-height: 24px;
  color: var(--grey);
  word-break: break-word;
`;

export const EditProfileLink = styled.a`
  font-size: 1.7rem;
  color: var(--blue);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  -webkit-tap-highlight-color: transparent;
`;

export const ProfileMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

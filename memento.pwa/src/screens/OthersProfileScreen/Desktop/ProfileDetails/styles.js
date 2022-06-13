import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import Avatar from "components/Avatar";
import Button from "components/Button";

export const ProfileTile = styled.div`
  box-shadow: 0 6px 10px #0000001a;
  background: ${({ theme }) => theme.profileColor};
  color: ${({ theme }) => theme.text};
  margin: -120px 18px 0 18px;
  border-radius: 6px;
  text-align: center;
  padding: 1.7em;

  @media (min-width: 481px) {
    max-width: 750px;
    width: 100%;
    margin: -110px auto 3rem auto;
  }
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled(Avatar)`
  border: 5px solid ${({ theme }) => theme.bgc};
  margin-top: -100px;
  position: relative;
  background-color: ${({ theme }) => theme.profileColor};
`;

export const ProfileName = styled.h3`
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 3.2rem;
  line-height: 5rem;
  margin-bottom: 1rem;
`;

export const ProfileBio = styled.p`
  font-size: 1.6rem;
  font-weight: var(--font-weight-light);
  line-height: 25px;
  color: var(--grey);
  word-break: break-word;
`;

export const ProfileMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 481px) {
    width: 60%;
    margin: 0 auto;
  }
`;

export const ProfileMetric = styled(Link)`
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const MetricValue = styled.h4`
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;

export const MetricLabel = styled.span`
  font-size: 1.6rem;
  font-weight: var(--font-weight-light);
  color: var(--grey);
`;

export const ProfileFollowContainer = styled.div`
  padding: 4rem 1rem 0 1rem;
  max-width: 80%;
  margin: 0 auto;
`;

export const FollowButton = styled(Button)`
  margin-bottom: -57px;
`;

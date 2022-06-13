import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserItemContainer = styled.div`
  padding: 2rem 3rem;
  position: relative;
  margin-bottom: 2rem;

  .selected-country-icon {
    position: absolute;
  }

  @media (max-width: 480px) {
    padding: 1.8rem;
    margin-bottom: 0;
  }
`;

export const UsernameLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-family: var(--font-headings);
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: 5px;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const UnreadIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: #10a5f5;
  border-radius: 10px;
`;

export const LeaderboardIconStyle = styled.div`
  color: ${({ theme }) => theme.oppositeColor};
  top: 15px;
  position: absolute;
  z-index: 1;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-weight: 450;
  left: 28px;
  font-size: 11px;

  @media (max-width: 480px) {
    top: 14px;
    left: 15px;
  }

  & > img {
    width: 23px;
    height: 23px;
  }

  & > span {
    position: absolute;
    left: 5;
  }
`

export const LeaderboardIconFireStyle = styled.div`
  color: white;
  top: 10px;
  position: absolute;
  z-index: 1;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
  font-weight: 500;
  font-size: 20px;
  left: 63px;

  @media (max-width: 480px) {
    top: 10px;
    left: 52px;
  }

  & img {
    width: 22px;
    height: 20px;
  }
`

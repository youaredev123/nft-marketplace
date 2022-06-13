import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserItemContainer = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const UsernameLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

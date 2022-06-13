import styled from "styled-components";
import { Link } from "react-router-dom";

export const ActivityRow = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const ActivityVerticalGroup = styled.div`
  width: 100%;
`;

export const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
`;

export const TimeLabel = styled.label`
  color: var(--grey);
  font-size: 1.2rem;
  font-weight: var(--font-weight-regular);
  margin-bottom: 1.3rem;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.text};
`;

export const Spacer = styled.div`
  background-color: #afafaf4d;
  height: 1px;
  width: 100%;
`;

export const ProfileNameLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: var(--font-weight-bold);
  font-size: 1.5rem;
  font-family: var(--font-headings);
  &:hover {
    text-decoration: none;
  }
`;

export const AmountOwner = styled.p`
  color: #10d310;
  margin-top: 5px;
`

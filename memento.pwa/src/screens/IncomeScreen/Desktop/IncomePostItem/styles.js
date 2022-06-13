import styled from "styled-components";
import { Link } from "react-router-dom";

export const IncomeItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({theme}) => theme.borderLineColor};
  background: blank;
  border-radius: 4px;

  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const BoxSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.line}`};
`;

export const Text = styled.p`
  color: grey;
  margin-left: 10px;
`;

export const IncomeValue = styled.span`
  width: 100%;
  font-size: 1.4rem;
  color: ${(props) => props.color || "var(--green)"};
  font-weight: var(--font-weight-normal);
  text-align: right;
`;

export const InfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem 2rem;

`

export const InfoBoxRow = styled.div`
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

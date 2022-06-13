import styled from "styled-components";

export const IncomeRow = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1.5fr 1fr;
  padding: 2.3rem 1.5rem;
  ${(props) => (props.hasborder ? "border-bottom: 1px solid #AFAFAF4D" : "")};
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const IncomeLabel = styled.span`
  color: var(--grey);
  font-size: 1.5rem;
  font-weight: var(--font-weight-regular);
`;

export const IncomeTotalLabel = styled.span`
  color: var(--blue);
  font-size: 1.5rem;
  font-weight: var(--font-weight-regular);
  width: 140px;
  textAlign: left;
`;

export const IncomeCount = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.text};
  margin-left: 10px;
`

export const IncomeValue = styled.span`
  width: 100%;
  font-size: 1.5rem;
  color: ${(props) => props.color || "var(--green)"};
  font-weight: var(--font-weight-normal);
  text-align: right;
`;

export const IncomeTotalValue = styled.span`
  width: 100%;
  font-size: 1.5rem;
  color: ${(props) => props.color || "var(--blue)"};
  font-weight: var(--font-weight-normal);
  text-align: right;
  padding-right: 10px;
`;

export const IncomeFollowersValue = styled.span`
  width: 100%;
  font-size: 1.5rem;
  color: ${(props) => props.color || "var(--green)"};
  font-weight: var(--font-weight-normal);
  text-align: right;
  padding-right: 10px;
`;

export const IncomeVerticalGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 1.5rem;
  }
`;

export const FollowersIncomeGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 -7px 4px;
  color: ${({ theme }) => theme.text};
`;

export const Spacer = styled.div`
  background: ${({ theme }) => theme.notificationBorderBottom};
  height: 11px;
  width: 100%;
`;

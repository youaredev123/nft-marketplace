import styled from "styled-components/macro";

export const UnlockMessage = styled.div`
  span {
    color: #10D310;
  }
`;

export const UnlockMessageContainer = styled.div`
  margin: 20px;
  background-repeat: no-repeat;
  border-radius: 25px;
  box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 15%);
`;

export const CityName = styled.div`
  cursor: pointer;
  height: auto;
  padding: 5px 0 0 0;
  webkit-tap-highlight-color: transparent;
  font-size: 1.7rem;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  color: ${({ theme }) => theme.text};
`;
export const TextItem = styled.div`
  align-items: center;
  color: var(--blue);
  display: flex;
  font-weight: var(--font-weight-regular);
  font-size: 1.6rem;
  height: 90%;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

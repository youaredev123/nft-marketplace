import styled from "styled-components/macro";

export const BackButton = styled.button`
  border: 0;
  outline: none;
  background-color: transparent;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem 1.5rem 1rem;
  border-bottom: 3px solid #f4f4f4;
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

import styled from "styled-components/macro";

export const Wrapper = styled.div`
    display: block;
    height: 100%;

    @media (max-width: 480px) {
        display: none;
    }
`;

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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 15px;
  line-height: 23px;
  min-height: 80vh;
  align-items: center;
  color: var(--blue);
  font-weight: var(--font-weight-regular);
  font-size: 1.6rem;
  height: 90%;
  width: 100%;
`;

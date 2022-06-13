import styled from "styled-components";

export const DesktopWrapper = styled.div`
  display: block;

  > h3 {
    width: 100%;
    text-align: center;
    padding-top: 3.5rem;
    margin-bottom: 2.3rem;
    font-weight: var(--font-weight-bold);
    letter-spacing: 0;
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 480px){
    display: none;
  }
`

export const FullHeight = styled.div`
  height: 100%;
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

  @media (max-width: 480px){
    margin-top: 50%
  }
`;

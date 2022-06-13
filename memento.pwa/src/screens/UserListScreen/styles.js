import styled from "styled-components";

export const Heading = styled.div`
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  padding-top: 3.8rem;
  padding-bottom: 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  min-height: calc(90vh - 130px);

  @media (min-width: 481px) {
    margin: 0 auto;
  }
`

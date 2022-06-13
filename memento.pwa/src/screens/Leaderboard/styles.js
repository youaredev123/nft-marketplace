import styled from "styled-components/macro";

export const Wrapper = styled.div`
  height: calc(100%);
  display: flex;
  flex-direction: column;
`;

export const NoItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--blue);
  font-weight: var(--font-weight-regular);
  font-size: 1.6rem;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  flex: 1;
`;

export const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DesktopWrapper = styled.div`
  display: block;

  > h3 {
    width: 100%;
    text-align: center;
    padding-top: 5.5rem;
    margin-bottom: 1.9rem;
    letter-spacing: 0;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 480px){
    display: none;
  }
`

export const ContentWrapper = styled.div`
  min-height: calc(90vh - 130px);

  @media (min-width: 481px) {
    margin: 0 auto;
  }
`

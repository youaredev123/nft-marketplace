import styled from "styled-components/macro";

export const SearchHeaderContainer = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;

  @media (min-width: 481px){
    display: none;
  }
`;

export const SearchFilter = styled.span`
  padding-top: 10px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--blue);
  font-size: 1.5rem;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const PrivateUsers = styled.div`
  padding-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-gap: 17px;
  margin: 0 4px 4px 4px;

  > a {
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 481px){
    grid-gap: 17px;
    margin: 0;
  }

  @media (max-width: 481px){
    grid-gap: 4px;
    margin: 0;
  }
`;

export const PrivateUsersWrapper = styled.div`
  min-height: calc(90vh - 130px);
  @media (min-width: 481px){
    margin: 0 auto;
    // margin: 0 auto 3rem auto;
  }
`

export const DesktopDescription = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 3.5rem;
  margin-bottom: 2.3rem;
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);  letter-spacing: 0;
  color: ${({ theme }) => theme.text};

  @media (max-width: 480px){
    display: none;
  }
`

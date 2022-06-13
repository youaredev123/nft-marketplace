import styled from "styled-components";

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  width: 100vw;
  max-width: 480px;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgc};

  @media (min-width: 481px){
    max-width: 100%;
    background: ${({ theme }) => theme.bgcMainLayout};
  }
`;

export const LayoutContent = styled.div`
  /* overflow-y: auto; */
  margin-bottom: ${(style) => style.marginBottom} !important;
`;

export const LayoutFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: 3.1fr 5.5fr 3.1fr 5.5fr 3.1fr;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: white;
  box-shadow: ${({theme}) => theme.footerBoxShadow};
  z-index: 2;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-muted {
    color: var(--superLightGrey);
    stroke: var(--superLightGrey);
    fill: none;
  }

  .nav-black {
    color: var(--black);
    stroke: var(--black);
  }

  .nav-black-home {
    color: var(--black);
    stroke: var(--black);
  }

  .nav-black-post {
    color: var(--black);
    stroke: var(--black);
    fill: none;
  }

  .nav-black-search {
    color: var(--black);
    stroke: var(--black);
    fill: none;
  }

  .nav-black-profile {
    color: var(--black);
    stroke: var(--black);
    fill: none;
  }

   @media (min-width: 481px){
    display: none;
  }
`;

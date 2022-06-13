import styled from "styled-components";

export const ProfileContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  @media (min-width: 480px){
    margin: 0 auto;
  }
`;
export const DesktopWrapper = styled.div`
  padding-bottom: 5rem;

  @media (max-width: 480px){
    display: none;
  }
  `

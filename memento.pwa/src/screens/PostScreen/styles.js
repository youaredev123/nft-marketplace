import styled from "styled-components";

export const FullHeight = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgc};

  @media (min-height: 481px){
    height: calc(100% - 96px);
  }
`;

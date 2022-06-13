import styled from "styled-components";

export const ShadowBox = styled.div`
  border: ${(props) => props.hideBorder ? '0px' : '1px'} solid ${({theme}) => theme.borderLineColor};
  border-radius: ${(props) => props.hideBorder ? '0px' : '6px'};
  margin-left: ${(props) => props.hideBorder ? '0px' : '15px'}};
  height: 100%;
  background: ${({ theme }) => theme.bgcMainLayout};
  color: ${({ theme }) => theme.text};

  @media (max-width: 480px) {
    border: none;
    background: ${({ theme }) => theme.bgc};
    margin-left: 0;
  }
`;

export const BodyWrapper = styled.div`
  .black-bg {
    > div {
      background: ${({ theme }) => theme.backgroundBoxColor};
    }
  }

  @media (min-width: 481px){
    padding-top: 18px;
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (max-width: 1000px){
    .col-12 {
      width: 100%!important;
      max-width: 100%!important;
      flex: 0 0 100%!important;
    }

    .col-4 {
      display: none!important;
    }
  }
`;

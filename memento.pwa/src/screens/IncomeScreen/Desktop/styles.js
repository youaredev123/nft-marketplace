import styled from "styled-components";

export const Desktop = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`

export const Info = styled.div`
  font-size: 16px;
  margin-top: 8px;
  font-weight: 500;
`

export const InfoTotals = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-gap: 17px;
`

export const InfoTotal = styled.div`
  background: ${({ theme }) => theme.backgroundBoxColor};
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.borderLineColor};
  display: flex;
  align-items: center;
  padding: 20px 0 20px 20px;
`

export const InfoRight = styled.div`
  margin-left: 22px;
  color: ${({l,c}) => l ? '#10A5F5' : c ? '#F510A5' : '#6634FF'};
`

export const InfoIcon = styled.div`
  width: 58px;
  height: 58px;
  background: ${({l,c}) => l ? '#10A5F5' : c ? '#F510A5' : '#6634FF'} 0 0 no-repeat padding-box;
  border-radius: 58px;

  color: var(--white);
  font-size: 3.5rem;
  text-align: center;
  line-height: 55px;

  > svg {
    width: 40px;
    height: 40px;
    vertical-align: text-bottom;
  }

  @media (max-width: 1200px) {
    width: 40px;
    height: 40px;
    border-right: 40px;
  }
`

export const InfoName = styled.div`
  font: normal normal medium 16px/21px Roboto;
  letter-spacing: 0;
  color: #939393;
  margin-bottom: 11px;
`

export const InfoPrise = styled.div`
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);  letter-spacing: 0;
  color: inherit;

  @media (max-width: 1200px) {
    font-size: 20px;
    height: 25px;
  }
`

export const InfoFields = styled.div`
  margin-top: 16px;
  display: flex;
  background: #FAFBFC 0 0 no-repeat padding-box ${({ theme }) => theme.bgc};
  border-radius: 4px;
  width: 100%;
`

export const Field = styled.div`
  padding: 19px 0 16px 18px;
  height: 56px;
  width: 25%;
  font: normal normal medium 16px/21px Roboto;
  letter-spacing: 0;
  color: #939393;
  & > svg {
    margin-right: 6px;
  }
  .FavoritesIconStl {
    opacity: 0.5;
  }
`

export const PostsList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-gap: 17px;
  margin: 1.7rem 0;
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`

export const Elem = styled.div`
  height: 120px;
  width: 100%;
`

import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  position: relative;

  &:after {
    content: "";
    display: block;
    border-bottom: 3px solid var(--blue);
    width: 32.2%;
    position: absolute;
    bottom: -10px;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
    left: ${({place}) => place * 101.7 / 3}%;
  }

  @media (min-width: 481px){
    width: 100%;
    margin: 0 auto;

    &:after {
      bottom: 0;
    }
  }
`

export const Line = styled.div`
  border-bottom: 2px solid #E3E3E3;
  width: 100%;
  margin-top: 10px;
  opacity: 0.6;

  @media (min-width: 481px){
    margin: 0 auto;
    padding-left: 4rem;
    margin: 0 auto;
    border-bottom-width: 2px;
  }
`

export const FilterElem = styled.div`
  width: 33.333333%;
  height: 29px;
  font-size: 14px;
  color: #939393;

  & div {
    padding: 15px 0 7px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  @media (min-width: 481px) {
    font-size: 16px;
    height: auto;

    & div {
      padding: 1.2rem 0 1.3rem 0;
    }
  }
`;

export const FilterElemActive = styled.div`
  color: #10A5F5;
  //border-bottom: 4px solid #10A5F5;
`

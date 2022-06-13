import styled from "styled-components/macro";
import Button from "components/Button";

export const FullHeight = styled.div`
  min-height: calc(100% - 58px);
  background: ${({ theme }) => theme.bgc};
`;

export const MarketItemTitle = styled.div`
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
  padding: 0px 0 20px 0px;
  line-height: 3.5rem;
  
  .title {
    font-size: 2.5rem;
    font-weight: var(--font-weight-bold);
  }
  
  .index {
    color: #10a5f5;
    font-weight: var(--font-weight-bold);
  }

  .rarity {
    font-size: 16px;
    color: grey;
  }
`;

export const MarketListItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  margin: 10px;
  grid-auto-rows: auto;
  grid-gap: 16px;
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const MarketListItemHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 2fr;
  grid-template-rows: auto;
  margin: 30px 10px;
  grid-auto-rows: auto;
  grid-gap: 16px;
  
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const MarketListItemTab = styled.div`
  display: flex;
  a {
    text-decoration: none;
    padding: 8px 10px;
    background-color: var(--grey);
    color: white;
    width: 80px;
    margin-right: 10px;
    border-radius: 20px;
    display: block;
    text-align: center;
    
     &.active {
       text-align: center;
       background-color: var(--blue);
    }
  }
`;

export const MarketSorter = styled.div`
  text-align: right;
  line-height: 28px;
  color: var(--blue);
  font-weight: var(--font-weight-bold);
`;

export const MarketItemStatus = styled.div`
    text-decoration: none;
    padding: 8px 25px;
    background-color: var(--blue);
    color: white;
    margin-right: 10px;
    border-radius: 20px;
    display: block;
    text-align: center;
    position: absolute;
    right: 5px;
    fill: darkgrey;
    
    &.sold {
      background-color: red;
    }
    
    &.sale {
      background-color: #00ac14;
    }
`;

export const SoldButton = styled(Button)`
  background: transparent linear-gradient(180deg,#ff0000 0%,#bd1b1b 100%) 0 0 no-repeat padding-box;
  box-shadow: 0 0 20px #10a5f559;  
  padding: 17px;
  font-size: 14px;
  background-color: red;
  color: white;
  border: none;

  @media (min-width: 481px) {
    width: auto;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem auto;
  }
`;

export const NFTNote = styled.div`
  margin-bottom: 30px;
  font-weight: var(--font-weight-medium);
`;

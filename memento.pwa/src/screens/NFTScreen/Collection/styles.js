import styled from "styled-components/macro";
import Button from "../../../components/Button";

export const NFTListItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  margin: 10px;
  grid-auto-rows: auto;
  grid-gap: 16px;
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const NFTCollectionDescription = styled.div`
  color: var(--blue);
  text-align: center;
  padding: 20px 0 10px 20px;
`;

export const FullHeight = styled.div`
  min-height: calc(100% - 58px);
  background: ${({ theme }) => theme.bgc};
`;

export const CreateNFTButton = styled.a`
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
    background: transparent linear-gradient(99deg,#00dbff 0%,#10a5f5 100%) 0 0 no-repeat padding-box;
`;

export const CoinListItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  margin: 10px;
  grid-auto-rows: auto;
  grid-gap: 16px;
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const DropButton = styled(Button)`
  padding: 10px;
  font-size: 100%;
  margin: 0 auto;
  width: 140px;
  box-shadow: none;
`;

export const InputGroupContainer = styled.div`
  margin: 0 20px;
  
  &.note-value {
    padding: 20px 0;
    text-align: center;
    color: var(--light-theme-bgc);
  }

  .price-note {
    padding: 20px 0;
    text-align: center;
    color: var(--light-theme-bgc);
  }

  .relic-info {
    display: inline;
    float: right;
    margin-top: 5%;
    margin-left: 2%;

    text-align: center;
    font-size: 1.6rem;
    
    span {
      color: #10a5f5;
      font-size: x-large;
      font-weight: var(--font-weight-bold);
    }
  }
`;

export const LoaderWrapper = styled.div`
  margin-top: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
import styled from "styled-components/macro";
import Button from "../../../components/Button";

export const SatchelListItemContainer = styled.div`
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

export const FullHeight = styled.div`
  min-height: calc(100% - 58px);
  background: ${({ theme }) => theme.bgc};
`;

export const SatchelItemTitle = styled.div`
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
  padding: 20px 0 20px 0px;
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

export const PostButton = styled(Button)`
  padding: 10px;
  font-size: 100%;
  margin-left: 38px;
  width: 140px;
  box-shadow: none;
`;

export const SidesMarginContainer = styled.div`
  margin: 0 20px;
  
  .relica-note {
    padding: 20px 0;
    text-align: center;
    color: lightgrey;
  }
`;

export const NFTNote = styled.div`
  font-weight: var(--font-weight-medium);
`;

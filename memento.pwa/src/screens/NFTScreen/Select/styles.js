import styled from "styled-components/macro";

export const NFTSelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: auto;
  margin: 10px;
  grid-auto-rows: auto;
  grid-gap: 16px;

  > a {
    -webkit-tap-highlight-color: transparent;
  }
  
  .toggle-item {
    border: none;
    
    .select-item {
      background: #efefef;
      border-radius: 12px;
      cursor: pointer;
      object-fit: contain;
      height: 150px;
      width: 150px;
      margin: 0 auto;
    }
    
    .check-mark {
      margin: 10px 0;
      
      .text {
        padding-left: 10px;
        margin: 0;
        line-height: 2.2rem;
      }
    }
  }
`;

export const FileInput = styled.input`
  // width: 0.1px;
  // height: 0.1px;
  // opacity: 0;
  // overflow: hidden;
  // position: absolute;
  // z-index: -1;
`;

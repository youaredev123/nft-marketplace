import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: block;
  > a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  margin: 4px;
  grid-auto-rows: auto;
  grid-gap: 17px;

  > a {
    -webkit-tap-highlight-color: transparent;
  }

  @media (max-width: 481px){
    grid-gap: 4px;
  }
`;

export function HiddenResults({ children, paddingTop }) {
  return (
    <SearchContainer style={{ paddingTop: paddingTop ? paddingTop : "50px" }}>
        {children}
    </SearchContainer>
  );
}

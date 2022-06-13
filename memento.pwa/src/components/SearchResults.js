import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-gap: 4px;
  margin: 0 4px 4px 4px;
  > a {
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 769px){
    grid-gap: 17px;
    margin: 0 auto;
    grid-gap: 17px;
    padding-top: 1.5rem;
  }

  > span {
    aspect-ratio: 1;
  }
`;
export function SearchResults({ children, paddingTop }) {
  return (
    <SearchContainer style={{ paddingTop: paddingTop ? paddingTop : "50px" }}>
      {children}
    </SearchContainer>
  );
}

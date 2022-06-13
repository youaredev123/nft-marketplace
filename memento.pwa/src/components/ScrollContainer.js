import React from "react";
import styled from "styled-components";

const ContainerScroll = styled.div`
  -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
  height: 100%;
  width: 100%;
`;

export default ({ children, height }) => (
  <ContainerScroll style={{ height }}>{children}</ContainerScroll>
);

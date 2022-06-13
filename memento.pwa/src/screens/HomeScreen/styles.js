import styled from "styled-components";

export const IncomeTotalValue = styled.span`
  color: var(--green);
`;

export const ShadowBox = styled.div`
  // box-shadow: 1px 0px 5px rgb(0 0 0 / 20%);
  border-left: 1px solid ${({theme}) => theme.copyLinkIconBgc};
`;

import styled from "styled-components";

export const PostDetailLabel = styled.span`
  color: var(--grey);
`;

export const PostDetailValue = styled.span`
  color: ${(props) => props.color || "black)"};
`;

import styled from "styled-components/macro";

export const TextAreaContainer = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  background: ${({ theme }) => theme.bgc};
`;
export const TextAreaLabel = styled.label`
  color: var(--blue);
  caret-color: #10a5f5;
`;

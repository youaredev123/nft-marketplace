import styled from "styled-components";

export const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem;
  min-height: 56px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
`;

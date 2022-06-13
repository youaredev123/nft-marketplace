import styled from "styled-components/macro";

export const UploadImageTile = styled.div`
  background: ${({ theme }) => theme.uploadImageBackground};
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--blue);
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  transition: 0.3s ease-in-out box-shadow;

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: var(--shadow);
  }
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

export const TextAreaBase = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  resize: none;
  caret-color: #10a5f5;
  height: 10px;
  border: 0;
  background: ${({ theme }) => theme.profileColor};
  border-bottom: 1px solid var(--superLightGrey);
  padding: 1.7rem 0 1.0rem 0;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: var(--grey2);
  }
  &:focus {
    outline: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  caret-color: #10a5f5;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--superLightGrey);
`;

export const InputBase = styled.input`
  display: block;
  width: 100%;
  border: 0;
  padding: 1.5rem 0 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  height: 50px;
  &::placeholder {
    color: var(--grey2);
    font-weight: var(--font-weight-regular);
  }
  &:focus {
    outline: none;
  }
`;

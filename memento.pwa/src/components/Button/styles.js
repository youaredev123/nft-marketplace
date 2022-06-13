import styled from "styled-components";

export const ButtonBase = styled.button`
  box-shadow: 0px 3px 3px #00000000;
  border-color: ${({ theme }) => theme.buttonBorderColor };
  color: ${({ theme }) => theme.text };
  border-radius: 35px;
  border-width: 1px;
  border-style: solid;
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.profileColor };
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.75px;
  font-size: 1.6rem;
  padding: 0.8em 2em;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &.primary {
    background: transparent linear-gradient(180deg, #00dbff 0%, #10a5f5 100%) 0 0 no-repeat padding-box;
    color: white;
    box-shadow: 0px 0px 20px #10a5f559;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: none;
  }
  
   &.green {
    background: transparent linear-gradient(99deg, #10D310 0%, #10D310 100%) 0 0 no-repeat padding-box;
    color: white;
    box-shadow: 0px 0px 20px #10a5f559;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: none;
  }

  &.transparent {
    background: rgba(138, 138, 138, 0.7) !important;
    min-width: 300px !important;
    color: white !important;
    font-size: 12px !important;
  }

  &.small {
    padding: 0.6em 1.6em;
    font-size: 1.3rem;
    -webkit-tap-highlight-color: transparent;
  }

  &.link {
    background: transparent;
    border: none;
    text-decoration: underline;
    color: var(--blue);
  }

  &.switch {
    background-color: #d1d1d1;
    color: white;
    border: none;
    font-size: 14px;
    padding: 1rem;
  }

  &.switch.primary {
    background: transparent linear-gradient(180deg, #00dbff 0%, #10a5f5 100%) 0 0 no-repeat padding-box;
  }

  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
  }
`;

import styled from "styled-components";
import { XCircle, X } from "react-feather";

export const MoneyButtonModalContent = styled.div`
  background-color: ${({ theme }) => theme.oppositeColor || '#ffffff'};
  border-radius: 10px 10px 0px 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px 10px 0px 0px;
`;

export const MoneyButtonModalHeaderContainer = styled.div`
  display: flex;
  // border-bottom: 0px solid #10a5f5;
  padding: 6px;
  justify-content: space-between;
  align-items: center;
  background: var(--blue);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #eaeaea80;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.span`
  font-size: 1.3rem;
  font-weight: var(--font-weight-medium);
  color: #939393;
`;

export const FilterOption = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: center;
  padding: 20px;
  &:hover,
  &:focus {
    cursor: pointer;
  }

  .custom-radio-option {
    border: 2px solid white;
    box-shadow: 0px 0px 0px 1.5px var(--superLightGrey);
    padding: 5px;
    border-radius: 50%;

    &.active {
      background: black;
      box-shadow: 0px 0px 0px 1.5px black;
    }
  }
`;

export const CloseIcon = styled(XCircle)`
  &:hover {
    cursor: pointer;
  }
`;

export const MoneyButtonCloseIcon = styled(X)`
  &:hover {
    cursor: pointer;
  }
  color: white;
`;

export const PostModalContainerStyle = styled.div`
    position: fixed;
    overflow-y: auto;
    bottom: 0;
    top: -1px;
    left: 0;
    right: 0;
    max-width: 480px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-color: white;
    padding-bottom: 3em;
    z-index: 1;

    @media (min-width: 481px){
        width: 100%;
        max-width: none;
        background: ${({ theme }) => theme.bgc};
    }
`;

export const PostModalStyle = styled.div`
  width: 480px;
  height: 100vh;

  @media (min-width: 481px){
    width: 100%;
    max-width: none;
    height: auto;
  }
`

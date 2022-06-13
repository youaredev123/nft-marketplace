import styled from "styled-components";
import { XCircle, X } from "react-feather";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 11;

  position: fixed;
  left: 50%;
  top: 50%;
  bottom: auto;
  margin: 0;
  overflow: hidden;
  transform: translate(-50%,-50%);

  & > div {
    width: ${({ width }) => width} !important;
    height: ${({ height }) => height};
  }

  .modal-body {
    background: ${({ theme }) => theme.bgc};
    border-radius: 6px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .modal-title {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 3rem;
      text-align: center;
      font-size: 2.4rem;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid ${({theme}) => theme.copyLinkIconBgc};

      .modal-close {
        position: absolute;
        right: 3rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }

    .modal-content {
      overflow: auto;
      height: 100%;
      max-height: 85vh;
      padding: 3rem 3rem;
      display: flex;
      flex-direction: column;
    }

    .modal-footer {
      height: 1.5rem;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 481px) {
    position: fixed;
    left: auto;
    top: auto;
    bottom: 0;
    overflow: unset;
    margin: 0 auto;
    transform: none;
    width: 100%;

    & > div {
      width: 480px !important;
    }
  }
`;

export const MoneyButtonModalContent = styled.div`
  background-color: ${({ theme }) => theme?.bgc || '#ffffff'};
  border-radius: 10px 10px 0px 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  @media (min-width: 481px) {
    border-radius: 10px;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 6px 6px 0px 0px;

  @media (min-width: 481px) {
    border-radius: 6px;
  }
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
  padding: 6px 14px;
  font-weight: 500;
  height: 56px;
  background-color: ${({ theme }) => theme?.popUpHeaderColor || "var(--lightGrey)"};
  color: ${({ theme }) => theme?.text || "var(--black)"};
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
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

export const ListEntry = styled.a`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme?.text || "var(--black)"};
  padding: 1.5rem 1.5rem 1.5rem 7rem;
  min-height: 5.6rem;
  font-size: 1.6rem;
  position: relative;
`;

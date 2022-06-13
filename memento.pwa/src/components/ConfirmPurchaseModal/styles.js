import styled from "styled-components";
import Button from "../Button";

export const ConfirmPurchaseModalContent = styled.div`
  background-color: ${({ theme }) => theme?.bgc || '#ffffff'};
  border-radius: 10px 10px 0px 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 100%;
  
  img {
    padding-bottom: 15px;
  }
  
  .p-4 {
    margin: 0 auto;
    text-align: center;
  }
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
  background-color: #10a5f5;
  color: white;
  justify-content: center;
`;

export const PostButton = styled(Button)`
  padding: 17px;
  font-size: 18px;
  box-shadow: none;
  width: 60%;
  margin: 0px auto;
  padding: 20px;
`;

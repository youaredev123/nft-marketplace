import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

export const SubmitButton = styled.button`
  background: transparent linear-gradient(106deg ,#00DBFF 0%,#10A5F5 100%) 0 0 no-repeat padding-box;
  box-shadow: 0 0 20px #10a5f559;
  border-radius: 50px;
  margin: 0px 10px 0px 10px;
  border: none;
  height: 46px;
  text-align: center;
  font: normal normal medium 16px/21px Roboto;
  font-size: 14px;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  color: #FFFFFF;
  width: 50%;
  cursor: pointer;
  outline: none;
`;

export const PurchaseButtonWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: block;
  text-align: center;
`

import styled from "styled-components/macro";

export const WideWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  padding: 20px 30px;
`;

export const ErrorWrapper = styled.div`
  color: #fff;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.75);
  border-radius: 30px;
  padding: 10px 20px;
`;

export const Text = styled.p`
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
`;

export const ErrorText = styled.p`
  padding-left: 20px;
  font-size: 1.2rem;
`;

export const InformationIcon = styled.div`
  float: left;
  text-align: center;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  max-width: 350px;
  height: 50px;
  border: 0.5px solid;
  border-color: ${({theme}) => theme.borderLineColor};
  oapcity: 0.5;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgtoast};
  color: ${({ theme }) => theme.texttoast};
  padding: 5px;
`
export const ImageMessage = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 10px
`
export const TextMessage = styled.div`

`
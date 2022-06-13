import styled from "styled-components";

export const Card = styled.div`
  width: 176px;
  height: 176px;
  margin: 0 auto 40px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 176px;
  min-width: 176px;
  background: url(${(props) => props.img}) no-repeat center center;
  background-size: cover;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`;

export const Age = styled.div`
  margin-bottom: 1.5rem;
`;

export const Amount = styled.p`
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`;

export const Icon = styled.img``;

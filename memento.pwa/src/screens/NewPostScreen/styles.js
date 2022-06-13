import styled from "styled-components/macro";
import { isPwa } from "../../components/AuthLayout";
import Button from "../../components/Button";

const isSafari = () =>
  navigator.vendor.match(/[Aa]+pple/g) &&
  navigator.vendor.match(/[Aa]+pple/g).length > 0;
export const ImageTile = styled.div`
  background: #efefef;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 4px;
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ImageContainer = styled.div`
  width: 100%;
  max-width: 100px;
  max-height: 100px;
  height: 100%;
  background-repeat: no-repeat;
  padding-bottom: 100%;
  border-radius: 4px;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
  box-shadow: none;
`;
export const ErrorNotification = styled.div`
  color: var(--blue);
  font-size: 1.6rem;
  text-align: center;
  padding: 1.5rem;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
export const BottomPostContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  bottom: 0;
  flex-direction: column-reverse;
  justify-content: space-between;
  background: ${({ theme }) => theme.bgc};
  overflow: hidden;
  z-index: 2;
  bottom: 90px;
  height: calc(100vh - 560px);
`;
const FullHeight = styled.div`
  height: 100%;
`;

export const NewPostScreenContainer = styled(FullHeight)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
  }
`;
export const TopPostContainer = styled.div`
  position: relative;
`;

export const PostButton = styled(Button)`
  padding: 17px;
  font-size: 14px;

  @media (min-width: 481px) {
    width: auto;
    border-radius: 40px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem auto;
  }
`;

export const InputContainer = styled.div`
  padding: 0 1.5rem
`;

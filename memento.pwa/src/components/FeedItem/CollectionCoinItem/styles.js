import styled from "styled-components";
import Avatar from "../../Avatar";

export const CollectionCoinItemContainer = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  border-radius: 25px;
  box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 15%);
  &:hover {
    cursor: pointer;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const CollectionCoinImageContainer = styled.div`
  background-color: #F0F0F0;
  width: 100%;
  height: 70%;
  border-radius: 25px 25px 0 0;
  border-bottom: 1px solid var(--light-theme-bgc);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CollectionCoinAvatar = styled(Avatar)`
  position: relative;
  margin: 0 auto;
  border-radius: 25px 25px 0% 0% !important;
  min-width: 100%;
  min-height: 100%;
  background-color: ${({theme}) => theme.profileColor};
`;

export const CollectionCoinItemProfileContainer = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding: 10px;
  color: ${({theme}) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 18px;
`;

export const HiddenImageAward = styled.div`
  display: block;
  vertical-align: middle;
  text-align: center;
  color: white;
  margin: 10px auto;
  text-decoration: none;
  background-color: #00B000;
  padding: 5px;
  width: 50%;
  border-radius: 20px;
`;

export const CollectionCoinItemProfileTitle =  styled.div`
  font-weight: var(--font-weight-bold);

  span {
    color: var(--blue);
  }
`;

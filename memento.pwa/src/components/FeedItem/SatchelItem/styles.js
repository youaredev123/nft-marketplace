import styled from "styled-components";
import Avatar from "../../Avatar";

export const ImageContainer = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  padding-bottom: 100%;
  border-radius: 25px;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
  box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 15%);
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const SatchelItemContainer = styled.div`
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

export const SatchelImageContainer = styled.div`
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

export const SatchelAvatar = styled(Avatar)`
  position: relative;
  margin: 0 auto;
  border-radius: 25px 25px 0% 0% !important;
  min-width: 100%;
  min-height: 100%;
  background-color: ${({theme}) => theme.profileColor};
`;

export const SatchelItemProfileContainer = styled.div`
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

export const SatchelItemProfileTitle =  styled.div`
		font-weight: var(--font-weight-bold);
		
		span {
		  color: var(--blue);
		}
`;

import styled from "styled-components";
import Avatar from "../../Avatar";

export const MarketItemContainer = styled.div`
  width: 100%;
  height: 150px;
  background-repeat: no-repeat;
  border-radius: 25px;
  box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 15%);
  display: grid;
  grid-template-columns: 1.3fr 2.5fr;
  &:hover {
    cursor: pointer;
  }
`;

export const MarketImageContainer = styled.div`
  background-color: #F0F0F0;
  width: 100%;
  border-radius: 25px 0 0 25px;
  box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 15%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MarketAvatar = styled(Avatar)`
  position: relative;
  margin: 0 auto;
  background-color: ${({theme}) => theme.profileColor};
  border-radius: 17% 0% 0% 17%;
  min-width: 100%;
  min-height: 100%;
`;

export const MarketItemProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
    padding: 10px;
    color: ${({theme}) => theme.text};
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
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
  background: transparent linear-gradient(106deg ,#00FF1E 0%,#00AC14 100%) 0 0 no-repeat padding-box;
`;

export const MarketItemProfileTitle =  styled.div`
		font-weight: var(--font-weight-bold);
		font-size: 2.3rem;
		
		span {
		  color: var(--blue);
		}
`;

export const RaritySpan = styled.div`
    margin: 5px;
    color: darkgrey
`
export const PriceLabel = styled.div`
  display: block;
  vertical-align: middle;
  text-align: center;
  color: white;
  margin: 0px auto;
  text-decoration: none;
  background-color: #00B000;
  padding: 5px;
  width: 50%;
  border-radius: 20px;
  background: transparent linear-gradient(106deg ,#00FF1E 0%,#00AC14 100%) 0 0 no-repeat padding-box;

  &.sold {
    background: transparent linear-gradient(106deg ,#ff0033 0%,#b30024 100%) 0 0 no-repeat padding-box;
  }
`;
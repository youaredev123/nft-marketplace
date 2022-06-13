import styled from "styled-components/macro";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.navBgc};
  width: 100%;
  max-width: 480px;
  box-shadow: ${({ theme }) => theme.headerBoxShadow};
  z-index: 1;
`;

export const HeaderDivider = styled.div`
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  height: 1px;
  top: 60px;
  max-width: 480px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => (props.isHome ? "100%" : "auto")};

  .option-menu {
    padding: 5px;
    cursor: pointer;
    position: absolute;
    width: 35px;
    right: 5px;
    fill: darkgrey;
  }

  .remove-relic-btn {
    margin-bottom: 30px;
    width: 120px;
    border-radius: 0px;
    background: #E40016;
    position: absolute;
    right: 0px;
    top: 60px;
    padding: 10px;
    font-size: 1.6rem;
    border-bottom-left-radius: 15px
  }
`;

export const Title = styled.span`
  cursor: pointer;
  display: inline-block;
  padding: 1px 4px 0 2px;
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
  line-height: 21px;
  color: ${({ theme }) => theme.text};
  margin: 0;
  -webkit-tap-highlight-color: transparent;
`;

export const BackButton = styled.button`
  border: 0;
  outline: none;
  background-color: transparent;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const MenuInPostStyle = styled.div`
  cursor: pointer;
  height: 30px;
  width: 27px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & div {
    height: 4px;
    width: 4px;
    border-radius: 4px;
    background-color: #9a9a9a;
  }
`;

export const LogoContainer = styled.div`
  margin-left: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LogoWrapper = styled.div`
  & > img {
    width: 70px;
    height: 30px;
  }
  & > svg {
    width: 70px;
    height: 30px;
  }
`;

export const LeaderboardWrapper = styled.div`
  display: flex;
  padding: 25px;
  &:hover {
    cursor: pointer;
  }
`;

export const Leaderboard = styled.img`
  width: 27px;
  height: 28px;
`;

export const GlobeIcon = styled.img`
  width: 27px;
  height: 28px;
  margin-right: 15px;
  cursor: pointer
`;

export const MarketIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 25px;
  cursor: pointer
`;

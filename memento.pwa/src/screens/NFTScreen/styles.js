import styled from "styled-components/macro";
import {NavLink} from "react-router-dom";

export const TabContainer = styled.div`
  display: grid;
  grid-template-rows: minmax(auto, max-content) 1fr;
  height: 100%;
  width: 100%;
`;

export const TabNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 3.5rem;
`;

export const TabNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 0 0 1rem 0;
  color: var(--grey);
  border-bottom: 1px solid ${({theme}) => theme.notificationBorderBottom};
  position: relative;
  
  &.active {
    color: var(--blue);
    -webkit-tap-highlight-color: transparent;
    /* text-decoration: none; */
    &:after {
      width: 100%;
    }
  }
  &:after {
    content: "";
    display: block;
    border-bottom: 3px solid var(--blue);
    width: 0;
    position: absolute;
    bottom: 0;
    // -webkit-transition: 0.5s ease;
    // transition: 0.5s ease;
  }
  &.firstLink {
    &:after {
      right: 0;
    }
  }
  &.secondLink {
    &:after {
      left: 0;
    }
  }
`;
export const TabContent = styled.div`
  position: relative;
  overflow-x: hidden;
  height: 100%;
`;

export const NoPostsText = styled.div`
  align-items: center;
  color: var(--blue);
  display: flex;
  font-size: 1.6rem;
  height: 90%;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const LoaderWrapper = styled.div`
  margin-top: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
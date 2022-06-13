import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TabContainer = styled.div`
  display: grid;
  grid-template-rows: minmax(auto, max-content) 1fr;
  height: 100%;
  width: 100%;

  @media (min-width: 481px) {
    margin: 0 auto;
    margin: 0 auto;
  }
  @media (max-width: 666px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (max-width: 518px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const TabNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 3.5rem;

  @media (min-width: 481px) {
    padding-top: 0;
  }
`;

export const TabNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 1.6rem 0 1.3rem 0;
  color: var(--grey);
  border-bottom: 2px solid #E9E9E9;
  position: relative;

  @media (min-width: 481px){
    font-size: 16px;
  }

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
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
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
`;

export const DesktopWrapper = styled.div`
  display: block;

  > h3 {
    width: 100%;
    text-align: center;
    padding-top: 3.5rem;
    margin-bottom: 1.8rem;
    font-size: 2.5rem;
    font-weight: var(--font-weight-bold);
    letter-spacing: 0;
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 480px){
    display: none;
  }
`

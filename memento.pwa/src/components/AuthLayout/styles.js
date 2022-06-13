import styled from "styled-components";

export const AuthContainer = styled.div`
  max-width: ${(props) => `${props.width}`};
  margin: 0 auto;
  background: ${(props) => `${props.background}`};
  min-height: ${(props) => `${props.height}`};
  height: ${(props) => `${props.height}`};
  min-height: -webkit-fill-available;
  padding: 0 1em;
  border-radius: 3px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  :after {
    content: "";
    position: absolute;
    bottom: -50px;
    height: 55px;
    width: 100%;
    right: 0;
  }

  @media (min-width: 481px){
    width: 100%;
    max-width: none;
    background-color: #fff;
    padding: 0;

    :after {
      display: none;
    }
  }
`;

import styled from "styled-components/macro";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);

  & > p {
    font-size: ${(props) => (props.smaller ? "1.4rem" : "2rem")};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.img`
  width: ${(props) => (props.width ? props.width : "inherit")};
`;

export const Text = styled.p`
  text-align: center;
  color: #fff;
  margin: ${(props) => (props.smaller ? "1rem 0" : "1.5rem 0")};
`;

export const Amount = styled.p`
  color: var(--green);
`;

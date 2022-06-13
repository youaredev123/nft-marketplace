import styled from "styled-components/macro";

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconWrapper = styled.div`
  & > svg {
    width: 3rem;

    & > path {
      fill: ${({ theme }) => theme.text};
    }
  }
`;

export const Icon = styled.img``;

export const Text = styled.p`
  &:first-of-type {
    margin: 2rem 0 1rem;
  }
`;

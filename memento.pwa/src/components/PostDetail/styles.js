import styled from "styled-components";
import { Link } from "react-router-dom";

export const ImageWrapper = styled.div`
  position: relative;
  max-height: 70vh;
  overflow: hidden;
`;

export const SkeletonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  > * {
    width: 100%;
  }
`;

export const ImageContainer = styled.img`
  box-shadow: 0 5px 6px -4px rgb(0 0 0 / 40%);
  width: 100%;
  height: 100%;
  display: ${(props) => props.imageLoaded ? "flex" : "none"};
  object-fit: contain;
  &:hover {
    ${(props) => (props.cannavigate ? "cursor: pointer;" : "")}
  }

  // Fix for maximum height of image include in 1 screen
  width: 100%;

  @media (min-width: 481px){
    border-radius: 0px;
  }
`;

export const FeedDescription = styled.p`
  letter-spacing: 0;
  line-height: 20px;
  color: var(--black);
  font-size: 1.5rem;
  margin: 0 0 20px;
  word-break: break-word;

  .tag-description {
    word-break: break-word;
    color: ${({ theme }) => theme.text};

  }
  a {
    text-decoration: none;
    color: var(--blue);
    &:hover {
      cursor: pointer;
    }
  }

   @media (min-width: 481px){
    .tag-description {
      font-size: 14px;
    }
  }
`;

export const FeedTitle = styled(Link)`
  font-size: 2.3rem;
  padding-left: 4px;
  padding-bottom: 4px;
  line-height: 24px;
  text-decoration: none;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  color: ${({ theme }) => theme.text};

   @media (min-width: 481px){
    font-size: 25px;
  }
`;

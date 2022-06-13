import styled from "styled-components";
import { Link } from "react-router-dom";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.text};
  justify-content: space-between;
  width: 100%;
  padding: 19px 0 6px 0;
  line-height: 20px;
`;

export const CommentAvatar = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const CommentContentContainer = styled.div`
  display: ${({Once}) => Once ? 'block' : 'flex'};
  flex-direction: column;
  justify-content: center;
  width: inherit;

  @media (max-width: 480px){
    flex-direction: column;
    justify-content: center;
  }
`;

export const CommentContentHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const UsernameLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
export const CommentHeaderDate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > a {
    text-decoration: none;
  }
`;

export const TimeLabel = styled.label`
  color: var(--grey2);
  font-size: 1.3rem;
  font-weight: var(--font-weight-regular);
  padding: 0 8px 0 0;
  a & {
    color: var(--blue);
    cursor: pointer;
  }
`;
export const CommentContentText = styled.div`
  align-items: center;
  display: flex;
  padding: 5px 10px 0 0;
  text-align: justify;
  text-justify: inter-word;

  @media (max-width: 480px){
    padding: 5px 10px 0 0;
    text-align: justify;
    margin-left: 0;
  }
`;
export const Text = styled.p`
  word-break: break-word;

  .tag-description {
    word-break: break-word;
    font-size: 1.4rem;
  }
`;

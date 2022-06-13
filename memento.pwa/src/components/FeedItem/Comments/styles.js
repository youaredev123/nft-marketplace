import styled from "styled-components";

export const CommentsContainer = styled.div`
  padding-bottom: 2.5rem;

  .mb-5 {
    marginTop: 10px;
    padding: 0;

    @media (min-width: 481px){
      padding: 0 2rem;
    }
  }

  @media (max-width: 480px){
    padding: 0 10px 140px;
  }

  @media (min-width: 481px){
    display: block !important;
    padding-bottom: 0;
  }
`;

export const CommentInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-gap: 15px;
`;

export const PostCommentLink = styled.span`
  color: var(--blue);
  font-weight: var(--font-weight-medium);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const DesktopInputContainer = styled.div`
  @media (max-width: 480px){
   display: none;
  }

  .mb-3 {
    padding: 0;

    @media (min-width: 481px){
      padding: 0 2rem;
    }
  }
`

export const PhoneInputContainer = styled.div`
  padding-left: 10px;

  @media (min-width: 481px){
   display: none;
  }
`

export const ViewMore = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
  color: ${({ theme }) => theme.text};
  padding: 0;

  @media (min-width: 481px){
    padding: 0 2rem;
  }
`

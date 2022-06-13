import styled from "styled-components";
import { CommentContainer, CommentHeaderDate, UsernameLink } from "components/CommentItem/styles";

export const CommentHeaderDateDesktop = styled(CommentHeaderDate)`
  justify-content: flex-start;
  align-items: baseline;

  a, label {
    color: #10a5f5;
    white-space: nowrap;
  }
`

export const UsernameLinkDesktop = styled(UsernameLink)`
  font-size: 1.6rem;
  padding-bottom: 0.2rem;
`

export const CommentContainerDesktop = styled(CommentContainer)`
  padding: 15px 0 6px 0;
`

export const CommentInputContainerDesktop = styled.div`
  margin: 0;
`

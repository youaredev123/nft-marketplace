import styled from "styled-components";

export const CopyLink = styled.div`
  display: flex;
  background: ${({ theme }) => theme.copyLinkInSettingBgc};
  border-radius: 1000px;
  width: 96%;
  margin: 0 auto;
  padding: 1.27rem 3.1rem 1.27rem 2.5rem;
  overflow: hidden;

  & svg {
    cursor: pointer;
  }
  & svg > g{
    fill: ${({ theme }) => theme.copyLinkIconBgc};;
  }
`;

export const LinkInput = styled.input`
  border: 0;
  width: calc(100% - 40px);
  margin-left: 5px;
  background: none;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.copyLinkText};
  &:focus {
    outline: none;
  }
`;

export const SocialNetworkLink = styled.a`
  color: #1da1f2;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #1da1f2;
  }
`;

export const ReservedText = styled.p`
  color: var(--blue);
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
`

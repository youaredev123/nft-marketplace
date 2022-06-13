import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileAvatar = styled(Avatar)`
  position: relative;
`;

export const EditProfileLink = styled(Link)`
  color: var(--blue);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
`;

export const FormContainer = styled.div`
  padding: 0 1.5rem;
`;

export const EditProfileCircle = styled(Link)`
  position: absolute;
  top: -10px;
  right: 0px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue);
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

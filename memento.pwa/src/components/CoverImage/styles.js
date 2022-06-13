import styled from "styled-components";
import { ReactComponent as CameraSvg } from "assets/icons/camera.svg";

export const CoverImageBase = styled.div`
  overflow: hidden;
  background-image: url(${(props) => props.url});
  overflow-x: hidden;
  background-size: cover;
  background-position: center;
  height: 320px;

  @media (max-width: 481px) {
    height: 290px;
  }
`;

export const ActionsBase = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const SettingsMenu = styled(ActionsBase)`
  top: 28px;
  right: 13px;
`;

export const EditCover = styled(ActionsBase)`
  top: 28px;
  left: 13px;

  @media (min-width: 481px) {
    top: 41px;
    right: 10px;
  }

  > * {
    &:hover,
    &:focus {
      cursor: pointer;
    }
  }

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export const CameraIcon = styled(CameraSvg)`
  height: 22px;
  width: 22px;
  color: #dadada;
  fill: none;
  stroke: #dadada;
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

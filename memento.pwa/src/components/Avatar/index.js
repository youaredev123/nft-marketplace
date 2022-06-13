import { findAllByTestId } from "@testing-library/react";
import React from "react";
import styled from "styled-components";
import PlaceHolderAvatar from "../../assets/images/avatar-placeholder.png";
import PlaceHolderAvtBold from "../../assets/images/logo.png";

const AvatarImage = styled.div`
  min-width: ${(props) => `${props.width || 54}px`};
  min-height: ${(props) => `${props.height || 54}px`};
  max-width: ${(props) => `${props.width || 54}px`};
  max-height: ${(props) => `${props.height || 54}px`};
  border-radius: 50%;
  background-image: ${(props) => props.urls.map((url) => `url(${url})`).join()};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-tap-highlight-color: transparent;
`;

export default ({ url, height, width, placeholderAvt = false, ...rest }) => {
  return (
    <AvatarImage
      height={height}
      width={width}
      urls={url ? [url, PlaceHolderAvatar] : (placeholderAvt ? [PlaceHolderAvtBold] : [PlaceHolderAvatar])}
      showBackground={url || false}
      {...rest}
    />
  );
};

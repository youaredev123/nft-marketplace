import React from "react";

import { ReactComponent as ProfileOutline } from "../assets/icons/profileOutline.svg";
import { ReactComponent as ProfileFilled } from "../assets/icons/profileFilled.svg";

export const ProfileIcon = ({filled, ...rest}) => {
  return filled ? <ProfileFilled {...rest} /> : <ProfileOutline {...rest} />;
};

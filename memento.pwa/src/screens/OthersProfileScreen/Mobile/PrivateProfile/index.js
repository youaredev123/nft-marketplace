import React from "react";
import {PrivateProfileContainer, PrivateProfileElement} from "screens/OthersProfileScreen/Mobile/PrivateProfile/styles";
import Lock_icon from 'assets/images/Lock_icon.svg'

const PrivateProfile = () => {
  return (
    <PrivateProfileContainer>
      <PrivateProfileElement>
        <img src={Lock_icon} alt="account private"/>
        <div>This account is private.</div>
        <div>You must follow them to view their content.</div>
      </PrivateProfileElement>
    </PrivateProfileContainer>
  )
}

export default PrivateProfile

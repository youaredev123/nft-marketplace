import React, {useEffect, useState} from "react";
import {PopUpContainer, PopUpOverLayer, PopUpWrapper} from "./styles";
import Lock_icon from "../../../assets/images/Lock_icon.svg";

const PopUpSuccessChangePrivateAccount = React.memo(({hide, refPopUp}) => {
  const [view, setHide] = useState(false)

  useEffect(() => {
    setHide(true)
  }, [])

  const style = view ? {opacity: 1} : {opacity: 0}

  return (
    <PopUpWrapper>
      <PopUpOverLayer>
        <PopUpContainer ref={refPopUp} id="PopUpPrivateProfile" style={style}>
          <img src={Lock_icon} alt="account private"/>
          <div>Your account is now private.</div>
          <div>Others can only see your photos after following you.</div>
          <button onClick={() => {hide(false)}}>Ok</button>
        </PopUpContainer>
      </PopUpOverLayer>
    </PopUpWrapper>
  )
})

export default PopUpSuccessChangePrivateAccount
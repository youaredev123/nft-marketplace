import React, {useEffect, useState} from 'react'
import {PopUpStyle, PopUpWrapper} from "./styles";
import useCurrentUser from "../../hooks/useCurrentUser";
import {useHistory} from "react-router-dom";

const PopUpBottom = ({text, handler, refPopUp}) => {
  const [view, setHide] = useState(false)
  const history = useHistory()

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setHide(true)
  }, [])

  const style = view ? {height: '56px'} : {height: '0px'}
  const styleWr = view ? {backgroundColor: '#0000008c'} : {backgroundColor: '#ffffff00'}
  return (
    <PopUpWrapper style={styleWr}>
      <PopUpStyle onClick={() => handler(history.location.pathname.split('/').pop(), currentUser.username)} ref={refPopUp} style={style}>
        <div>
          {text}
        </div>
      </PopUpStyle>
    </PopUpWrapper>
  )
}

export default PopUpBottom
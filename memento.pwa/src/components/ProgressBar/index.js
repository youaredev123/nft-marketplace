import React, {useEffect, useState} from 'react'
import {ProgressBarContainer, ProgressBarContainerHidden, ProgressBarProgressInfinite} from "./styles";

const ProgressBar = () => {
  const [view, setHide] = useState(false)

  useEffect(() => {
    setHide(true)
  }, [])

  const style = view ? {opacity: 1} : {opacity: 0}

  return (
    <ProgressBarContainer>
      <ProgressBarContainerHidden style={style}>
        <ProgressBarProgressInfinite/>
      </ProgressBarContainerHidden>
    </ProgressBarContainer>
  )
}

export default ProgressBar
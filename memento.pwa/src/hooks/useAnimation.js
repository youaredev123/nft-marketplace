import React, {useEffect, useRef, useState} from "react";
import ContentService from "../services/ContentService";
import {useHistory} from "react-router-dom";

export const AnimationContext = React.createContext({});

const useAnimation = ({children}) => {
  const history = useHistory()
  const [viewPopUpBottom, setViewPopUpBottom] = useState(null) // text popup || false || null
  const refPopUpBottom = useRef()

  function handleClickOutside(e) {
    if (!e.path.includes(refPopUpBottom.current)) {
      setViewPopUpBottom(null)
    }
  }

  useEffect(() => { // hide popup on click outside
    if (viewPopUpBottom){
      document.addEventListener('click', handleClickOutside)
    }else{
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [viewPopUpBottom])

  const handlerHidePost = (id, username) => { // TODO: determine content ID
    ContentService.hidePicture(id)
      .then(() => {
        history.push(`/${username}`)
      })
    setViewPopUpBottom(null);
  }

  const value = {
    viewPopUpBottom,
    setViewPopUpBottom,
    refPopUpBottom,
    handlerHidePost
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export default useAnimation;
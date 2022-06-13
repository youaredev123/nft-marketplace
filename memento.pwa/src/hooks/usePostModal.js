import useWindowDimensions from "hooks/useWindowWidth";
import React, {useCallback, useContext, useEffect, useState} from "react";
import { ModalContent } from "components/ModalContainer/styles";
import ModalContainer from "components/ModalContainer";
import { useHistory } from "react-router-dom";
import PostDetail from "components/PostDetail";
import {ThemeContext} from "styled-components";
import {DarkModeContext} from "./useDarkMode";
import { X } from "react-feather";

const usePostModal = () => {
  const history = useHistory();
  const { windowWidth } = useWindowDimensions();
  const [isShow, setShow] = useState(false);
  const [postId, setPostId] = useState(null);
  const [bodyOverflow, setBodyOverflow] = useState(null);
  const themeContext = useContext(ThemeContext);
  const DM = useContext(DarkModeContext)

  const viewPost = useCallback((contentId) => {
    setPostId(contentId);
    const isDesktopMode = windowWidth >= 481;

    if (!isDesktopMode) {
      history.push(`/post/${contentId}`, { modal: true });
    } else {
      setShow(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (isShow) {
      if (bodyOverflow === null) {
        // Get original body overflow
        setBodyOverflow(window.getComputedStyle(document.body).overflow);
      }

      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflow + "";
    }

    return () => {
      document.body.style.overflow = bodyOverflow + "";
    };
  }, [isShow, bodyOverflow]);

  const renderModalContent = useCallback(() => {
    return (
      <PostDetail
        contentId={postId}
        showComments
      />
    );
  }, [postId]);

  const renderModal = () => {
    return (
      <ModalContainer width={"120vh"} show={isShow} onClose={() => setShow(false)} customBody>
        {/* Back button - X */}
        <div className={"relic-modal-custom-back-btn"} onClick={() => setShow(false)}><X/></div>
        <ModalContent style={{background: themeContext.backgroundBoxColor, border: DM.darkMode ? `1px solid #272727` : '0'}}>
          {renderModalContent()}
        </ModalContent>
      </ModalContainer>
    );
  };

  return {
    viewPost,
    renderModal
  };
};

export default usePostModal;

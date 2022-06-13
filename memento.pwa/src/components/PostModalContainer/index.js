import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";

import useBodyScrollLock from "hooks/useBodyScrollLock";
import { ThemeContext } from "styled-components";
import { PostModalContainerStyle, PostModalStyle } from "./styles";

const PostModalContainer = ({ show = true, children }) => {
  useBodyScrollLock();
  const theme = useContext(ThemeContext);

  return (
    <AnimatePresence>
      {show && (
        <PostModalContainerStyle>
          <PostModalStyle key={show} style={{
            background: theme.bgc || "white",
          }}>
            {children}
          </PostModalStyle>
        </PostModalContainerStyle>
      )}
    </AnimatePresence>
  );
};

export default PostModalContainer;

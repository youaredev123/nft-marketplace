import React, { useCallback, useContext } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import { ModalWrapper } from "components/ModalContainer/styles";
import { ThemeContext } from "styled-components";

const modalRoot = document.querySelector("#modalRoot");

const ModalContainer = (
  {
    show,
    children,
    onClose,
    height,
    title,
    customBody = false,
    width = null,
  }
) => {
  const themeContext = useContext(ThemeContext);

  const modalContent = useCallback(() => {
    if (!customBody) {
      return (
        <div className={"modal-body"} style={{ color: themeContext.text }}>
          <div className={"modal-title"}>
            {title}
            <div className={"modal-close"} onClick={onClose}>
              <X/>
            </div>
          </div>
          <div className={"modal-content"}>
            {children}
          </div>
          <div className={"modal-footer"}>
          </div>
        </div>
      );
    }

    return (
      <>{children}</>
    );
  }, [children, customBody, title, onClose]);

  let content = (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={onClose}
          key={"bg" + show}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "10",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "anticipate" }}
        ></motion.div>
      )}
      {show && (
        <ModalWrapper width={width ? width : "100vh"} height={height ? height : "auto"}>
          <motion.div
            key={show}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "anticipate" }}
          >
            {modalContent()}
          </motion.div>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(content, modalRoot);
};

export default ModalContainer;

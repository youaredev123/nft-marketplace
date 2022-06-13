import React, { useState, useContext, useRef } from "react";
import ReactDOM from "react-dom";

const toastDelay = 3000;

const modalRoot = document.querySelector("#preModalRoot");

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [ currentToast, setCurrentToast ] = useState(null);
  const timeout = useRef();

  const showToast = (toast) => {
    setCurrentToast(toast);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setCurrentToast(null);
    }, toastDelay);
  };

  const renderToast = () => ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      bottom: "100px",
      width: "auto",
      zIndex: "21",
      left: "50%",
      transform: 'translate(-50%)'
    }}>
      <div style={{margin: "0 auto"}}>
        {currentToast}
      </div>
    </div>, modalRoot);

  const value = {
    showToast,
    renderToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default function useToast() {
  return useContext(ToastContext);
}

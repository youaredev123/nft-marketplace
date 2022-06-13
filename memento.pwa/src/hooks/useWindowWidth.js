import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  function getWindowWidth() {
    const windowWidth = hasWindow ? window.innerWidth : null;
    const squareLength = windowWidth > 479 ? 435 : windowWidth - 36;

    return {
      windowWidth,
      squareLength,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowWidth());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowWidth());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

export default useWindowDimensions;

import { useState, useEffect } from "react";

const getWidth = element => element && element.getBoundingClientRect().width;

export function useCurrentWidth(element) {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth(element.current));

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    setWidth(getWidth(element.current));
    let raf;
    loop();
    function loop() {
      raf = requestAnimationFrame(loop);

      let w = getWidth(element.current);
      if (w !== width) {
        setWidth(w);
      }
    }
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth(element.current)), 150);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      cancelAnimationFrame(raf);
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, [element]);

  return width;
}

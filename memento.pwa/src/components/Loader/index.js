import React from "react";
import { Loader } from "./styles";
import MDSpinner from "react-md-spinner";
const Spinner = ({ style, color, size }) => {
  return (
    <Loader style={style}>
      <MDSpinner
        color1={color || "var(--blue)"}
        color2={color || "var(--blue)"}
        color3={color || "var(--blue)"}
        color4={color || "var(--blue)"}
        size={size}
      />
    </Loader>
  );
};
export default Spinner;

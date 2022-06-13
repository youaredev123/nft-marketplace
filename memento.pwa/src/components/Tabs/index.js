import React from "react";
import { Parent } from "./styles";

export default (props) => {
  return (
    <>
      <Parent>
        <div 
          className={`tab ${(props.selected == 0 ? ' selected' : '')}`}
          onClick={() => props.onTabChange(0)}
        >
          Tags
        </div>
        <div 
          className={`tab ${(props.selected == 1 ? ' selected' : '')}`}
          onClick={() => props.onTabChange(1)}
        >
          Users
        </div>
      </Parent>
    </>
  );
};

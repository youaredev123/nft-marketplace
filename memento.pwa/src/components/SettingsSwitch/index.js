import React, {useContext} from "react";
import { ReactComponent as SettingsSwitchBase } from "../../assets/icons/i-switcher base.svg";
import { Wrapper, Handle } from "./styles";
import {ThemeContext} from "styled-components";

export default ({ on, onClick, shouldLightUp = true }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Wrapper>
      <SettingsSwitchBase
        onClick={onClick}
        color={themeContext.switchBgc}
        style={{
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent"
        }}/>
      <Handle
        className={on ? "on" : ""}
        shouldLightUp={shouldLightUp}
      />
    </Wrapper>
  );
}

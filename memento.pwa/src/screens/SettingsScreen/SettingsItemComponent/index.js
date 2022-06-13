import React from 'react'
import SettingsSwitch from "../../../components/SettingsSwitch";
import {SettingsItem} from "../styles";

const SettingsItemComponent = ({status, handler, text}) => {
  return (
    <SettingsItem>
      <span>{text}</span>
      <SettingsSwitch on={status} onClick={handler} />
    </SettingsItem>
  )
}

export default SettingsItemComponent
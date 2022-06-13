import React, { useCallback, useContext } from "react";
import { DarkModeContext } from "hooks/useDarkMode";
import {
  DarkModeImages,
  DarkModeSelect,
  DarkModeSelectContent,
  DarkModeSelectOption,
  SubmitButton,
  TabContentWrapper
} from "screens/SettingsScreen/Desktop/Tab/styles";
import DarkModeImg1 from "assets/images/dark_mode_1.png";
import DarkModeImg2 from "assets/images/dark_mode_2.png";
import { ReactComponent as RBC } from "assets/images/radio-btn-checked.svg";
import { ReactComponent as RBD } from "assets/images/radio-btn-disable.svg";

const DarkModeTab = () => {
  const DM = useContext(DarkModeContext);

  const displayPurchase = useCallback(() => {
    if (DM.darkModePurchased) {
      return null;
    }

    return (
      <div className={"text-center"}>
        <SubmitButton
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            DM.handlerBuyDarkMode();
          }}
        >
          Purchase $1
        </SubmitButton>
      </div>
    );
  }, [DM, DM.darkModePurchased]);

  const displayToggle = useCallback(() => {
    if (!DM.darkModePurchased) {
      return null;
    }

    return (
      <DarkModeSelect className={"d-flex"}>
        <DarkModeSelectOption onClick={() => DM.setDarkMode(false)} active={!DM.darkMode}>
          <DarkModeSelectContent>
            {!DM.darkMode ?
              <RBC/> :
              <RBD/>
            }
            <div>Light Mode</div>
          </DarkModeSelectContent>
        </DarkModeSelectOption>

        <DarkModeSelectOption onClick={() => DM.setDarkMode(true)} active={DM.darkMode}>
          <DarkModeSelectContent>
            {DM.darkMode ?
              <RBC/> :
              <RBD/>
            }
            <div>Dark Mode</div>
          </DarkModeSelectContent>
        </DarkModeSelectOption>
      </DarkModeSelect>
    );
  }, [DM, DM.darkModePurchased]);

  return (
    <>
      <TabContentWrapper style={{ marginTop: "0"}}>
        <h3>Dark Mode</h3>
        <DarkModeImages>
          <img src={DarkModeImg1} alt={"Dark Mode"}/>
          <img src={DarkModeImg2} alt={"Dark Mode"}/>
        </DarkModeImages>
        {displayPurchase()}
        {displayToggle()}
      </TabContentWrapper>
    </>
  );
};

export default DarkModeTab;

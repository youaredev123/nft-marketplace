import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router";
import Navigation from "./Navigation";
import MoneyButtonModal from "../MoneyButtonModal";
import { MainGrid, LayoutContent, LayoutFooter } from "./styles";
import useToast from "../../hooks/useToast";
import { usePayments } from "../../hooks/usePayments";
import ProgressBar from "../ProgressBar";
import PopUpBottom from "../PopUpBottom";
import { AnimationContext } from "../../hooks/useAnimation";
import { DarkModeContext } from "../../hooks/useDarkMode";

export default ({ displayFooter = true, children }) => {
  const { renderToast } = useToast();
  const AS = useContext(AnimationContext) // AnimationState
  const DM = useContext(DarkModeContext);
  const location = useLocation();

  const {
    needsMoneyButtonModal,
    showMoneyButtonModal,
    hideMoneyButtonModal,
    moneyButtonModalProps,
    viewProgressBar,
  } = usePayments();

  const ProgressBarLine = useMemo(() => (
      viewProgressBar && (
        <ProgressBar />
      )
  ), [viewProgressBar])

  const PopUpBtm = useMemo(() => {
    if (AS.viewPopUpBottom){
      return <PopUpBottom text={AS.viewPopUpBottom} refPopUp={AS.refPopUpBottom} handler={AS.handlerHidePost}/>
    }
  },[AS.viewPopUpBottom]);

  const isAuthenticating = [
    "/app/moneybutton/return",
    "/auth/api/handcash/success",
    "/auth/api/handcash/decline",
  ].indexOf(location.pathname) !== -1;

  return (
    <div>
      <MainGrid>
        <LayoutContent >{children}</LayoutContent>
        {isAuthenticating || !displayFooter ? null : (
          <LayoutFooter>
            <Navigation />
          </LayoutFooter>
        )}
        {renderToast()}
        {needsMoneyButtonModal && <MoneyButtonModal
            show={showMoneyButtonModal}
            onHide={hideMoneyButtonModal}
            moneyButtonProps={moneyButtonModalProps}
        />}
        {ProgressBarLine}
        {PopUpBtm}
      </MainGrid>
    </div>
  );
};

import React, {useCallback, useContext, useState} from "react";
import ModalContainer from "../ModalContainer";
import { ReactComponent as MoneyButtonIcon } from "assets/icons/moneybutton-icon.svg";
import { ReactComponent as HandCashIcon } from "assets/icons/handcash_icon.svg";
import { ReactComponent as BlueTickIcon } from "assets/icons/Blue tick.svg";
import { useAccount } from "hooks/useAccount";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useMoneyButton } from "hooks/useMoneyButton";
import { useHandCash } from "hooks/useHandCash";

import {
  MoneyButtonModalContent,
  ModalHeaderContainer,
  ListEntry,
} from "../ModalContainer/styles";
import {ThemeContext} from "styled-components";

const SelectWalletModal = ({ show, onHide, isFromSettingsMenu }) => {
  const { walletType } = useAccount();
  const [ addFlow, setAddFlow ] = useLocalStorage("login_add_flow", null, true);
  const { requestAuthorization: requestMBAuthorization } = useMoneyButton();
  const { authorizationUrl: hcAuthorizationUrl } = useHandCash();
  const [ justClickedMb, setJustClickedMb ] = useState(false);
  const [ justClickedHc, setJustClickedHc ] = useState(false);
  const themeContext = useContext(ThemeContext);
  const loginMB = useCallback(() => {
    if (
      walletType === "moneybutton" ||
      // if there's no provider type info, then it's Money Button
      (isFromSettingsMenu && walletType === null)
    ) {
      onHide();
      return;
    }

    setJustClickedMb(true);
    if (isFromSettingsMenu) {
      setAddFlow(true);
    }
    requestMBAuthorization();
  }, [setAddFlow, requestMBAuthorization]);

  const loginHC = useCallback(() => {
    if (walletType === "handcash") {
      onHide();
      return;
    }

    setJustClickedHc(true);
    if (isFromSettingsMenu) {
      setAddFlow(true);
    }
    window.location = hcAuthorizationUrl;
  }, [setAddFlow, hcAuthorizationUrl]);

  const walletSelectedTick = <BlueTickIcon
    style={{ position: 'absolute', right: '15px', top: '8px' }}
    width={25}
    height={25}
  />;
  const shouldShowMbTick = justClickedMb || (!justClickedHc && walletType === "moneybutton");
  const shouldShowHcTick = justClickedHc || (!justClickedMb && walletType === "handcash");

  const closeIcon = <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onHide}
    style={{ cursor: "pointer" }}>
      <circle cx="12" cy="12" r="10" fill="var(--grey)" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="var(--lightGrey)" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="var(--lightGrey)" />
  </svg>;

  return (
    <ModalContainer show={show} customBody={true} onClose={onHide} height={"240px"}>
      <MoneyButtonModalContent>
        <ModalHeaderContainer>
          Select Wallet
          {closeIcon}
        </ModalHeaderContainer>
        <div style={{ height: "1.5rem" }} />
        {hcAuthorizationUrl &&
          <>
            <ListEntry href="#" onClick={loginHC}>
              <HandCashIcon style={{ position: 'absolute', left: '15px', top: '2px' }} width={"40px"} height={"40px"} alt={"HandCash"} />
              {shouldShowHcTick && walletSelectedTick}
              HandCash
            </ListEntry>
            <ListEntry href="#" onClick={loginMB}>
              <MoneyButtonIcon style={{ position: 'absolute', left: '15px', top: '2px' }} width={"40px"} height={"40px"} alt={"Money Button"} />
              {shouldShowMbTick && walletSelectedTick}
              Money Button
            </ListEntry>
          </>}
        <div style={{ height: "7rem" }} />
      </MoneyButtonModalContent>
    </ModalContainer>
  );
};

export default SelectWalletModal;

import React, { useCallback, useState } from "react";
import { ReactComponent as HandCashIcon } from "assets/icons/handcash-icon.svg";
import { ReactComponent as MoneyButtonIcon } from "assets/icons/moneybutton-icon.svg";
import { ReactComponent as RBC } from "assets/images/radio-btn-checked.svg";
import { ReactComponent as RBD } from "assets/images/radio-btn-disable.svg";
import { useAccount } from "hooks/useAccount";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useMoneyButton } from "hooks/useMoneyButton";
import { useHandCash } from "hooks/useHandCash";
import { MyOption, MyOptionContent, MySelect, SubmitButton, TabContentWrapper } from "./styles";

const MONEY_BUTTON = "moneybutton";
const HAND_CASH = "handcash";

const SelectWalletTab = ({ isFromSettingsMenu }) => {
  const { walletType, hydrateUser } = useAccount();
  const [addFlow, setAddFlow] = useLocalStorage("login_add_flow", null, true);
  const { requestAuthorization: requestMBAuthorization } = useMoneyButton();
  const { authorizationUrl: hcAuthorizationUrl } = useHandCash();
  const [activeWallet, setActiveWallet] = useState(walletType);

  const submitHandle = useCallback(() => {
    if (walletType === activeWallet || (isFromSettingsMenu && walletType === null)) {
      return;
    }

    if (isFromSettingsMenu) {
      setAddFlow(true);
    }

    if (activeWallet === MONEY_BUTTON) {
      requestMBAuthorization();
    } else {
      window.location = hcAuthorizationUrl;
    }
  }, [activeWallet, setAddFlow, requestMBAuthorization, hcAuthorizationUrl]);

  return (
    <>
      <h3>
        Select Wallet
      </h3>
      <TabContentWrapper>
        <MySelect>
          <MyOption onClick={() => setActiveWallet(HAND_CASH)} active={activeWallet === HAND_CASH}>
            <MyOptionContent>
              {activeWallet === HAND_CASH ?
                <RBC/> :
                <RBD/>
              }
              <HandCashIcon width="40px" height="40px" alt={"HandCash"}/>
              <div>Handcash</div>
            </MyOptionContent>
          </MyOption>

          <MyOption onClick={() => setActiveWallet(MONEY_BUTTON)} active={activeWallet === MONEY_BUTTON}>
            <MyOptionContent>
              {activeWallet === MONEY_BUTTON ?
                <RBC/> :
                <RBD/>
              }
              <MoneyButtonIcon alt={"Money Button"} width={"40px"} height={"40px"}/>
              <div>Moneybutton</div>
            </MyOptionContent>
          </MyOption>
        </MySelect>
        <div className={"text-center"}>
          <SubmitButton style={{width: "178px"}} href="#" onClick={() => submitHandle()}>
            Save
          </SubmitButton>
        </div>
      </TabContentWrapper>
    </>
  );
};

export default SelectWalletTab;

import React, { createContext, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "styles/globalStyles";
import confetti from 'canvas-confetti';
import { usePayments } from "./usePayments";
import { useAccount } from "./useAccount";
import UserService from "../services/UserService";

export const DarkModeContext = createContext({});

export function DarkModeProvider({ children }) {
  const { account, setAccount } = useAccount();
  const { pay } = usePayments();

  const handlerBuyDarkMode = () => {
    const onPayment = () => {
      const myCanvas = document.createElement('canvas');
      document.getElementById('root').appendChild(myCanvas);

      myCanvas.setAttribute('style', `
          position: fixed;
          width: 100vw;
          top: 0px;
          height: 100vh;
          left: 0;
          min-width: 480px;
        `);
      const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
      });

      myConfetti({
        particleCount: 250,
        spread: 400,
      });

      setTimeout(() => {
        myCanvas.remove();
      }, 3800);

      if (!account.purchases) {
        account.purchases = {};
      }
      account.purchases.darkMode = true;
      setDarkMode(true);
    };

    pay({
      type: "DARK_MODE",
      data: {
        enabled: true,
      },
      onPayment,
      onError: console.error,
    });
  };

  const darkMode = account && account.darkMode;
  const darkModePurchased = account && account.purchases &&
    account.purchases.darkMode;

  const setDarkMode = useCallback(async (enabled) => {
    if (!account || !account.purchases || !account.purchases.darkMode) {
      console.error("Relica: Attempting to switch dark mode using an" +
        " account that didn't pay for it.");
      return;
    }

    setAccount({ ...account, darkMode: enabled });
    await UserService.setDarkMode(enabled);
  }, [darkModePurchased, account, setAccount]);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        darkModePurchased,
        setDarkMode,
        handlerBuyDarkMode
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles/>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}


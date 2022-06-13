import { useCallback } from "react";
import UserService from "../services/UserService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import WalletService from "services/WalletService";

export function useWallet() {

  const [wallets, setWallets] = useLocalStorage(
    "relica_wallets",
    null
  );

  const checkWalletEmail = useCallback(async (email) => {
    const response = await UserService.checkWalletEmail(email);
    return response.status == 200 && response.data?.emailExists === false;
  }, []);

  const createWallet = useCallback(async (data) => {
    const response = await UserService.createWallet(data);
    const isSuccess = response.status === 200;
    if (isSuccess) {
      var relicaWallet = {
        currentBsvPrivateKey : data.currentBsvPrivateKey,
        currentJigPrivateKey : data.currentJigPrivateKey,
        currentBsvChildAddress : data.currentBsvChildAddress,
        currentJigChildAddress : data.currentJigChildAddress,
        password : response.data.password
      };

      setWallets(relicaWallet);
    }
    return isSuccess;
  }, []);

  const walletRecovery = useCallback(async (base64Password) => {
    const response = await UserService.getWallet(base64Password);
    if (response.status === 200) {
      const { password } = response.data;
      const { data: { mnemonic } } = await UserService.getKeys(password);
      const { data: { walletInfo } } = await WalletService.createBSVWallet({ mnemonic });

      const wallet = {
        currentBsvChildAddress: walletInfo.currentBsvChildAddress,
        currentJigChildAddress: walletInfo.currentJigChildAddress,
        currentBsvPrivateKey: walletInfo.currentBsvPrivateKey,
        currentJigPrivateKey: walletInfo.currentJigPrivateKey,
        password: password
      }

      if (wallet) {
        setWallets(wallet);
      }
      
      return { ...wallet, mnemonic };
    }

    return false;
  }, []);

  const getWallet = useCallback(() => {
    //cannot get localstorage data by using useLocalStorage function
    //due to async issue
    //const wallet = localStorage.getItem("relica_wallets");
    //return wallet ? JSON.parse(wallet) : null;
    return wallets;
  }, [wallets]);

  return { checkWalletEmail, createWallet, walletRecovery, getWallet };
}

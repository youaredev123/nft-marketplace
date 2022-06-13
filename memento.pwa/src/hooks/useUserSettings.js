import { useCallback, useState } from "react";

import UserService from "../services/UserService";
import { useAccount } from "./useAccount";

export const useUserSettings = () => {
  const [oneClickPaymentsEphemeral, setOneClickPaymentsEphemeral] = useState(
    null
  );
  const { account, setAccount, walletType } = useAccount();

  const oneClickPayments =
    oneClickPaymentsEphemeral === null
      ? account
        ? account.wallets[walletType].oneClick
        : false
      : oneClickPaymentsEphemeral;

  // Note that we don't try to refresh current user profile
  // using useCurrentUser().fetchCurrentUser() or something else,
  // as server can send stale data.
  // We just update the locally stored user profile instead.
  const setOneClickPayments = useCallback(
    async (enabled) => {
      setOneClickPaymentsEphemeral(enabled);
      await UserService.setOneClickPayments(enabled);
      account.wallets[walletType].oneClick = enabled;
      await setAccount(account);
      setOneClickPaymentsEphemeral(null);
    },
    [account]
  );

  const updateExclusivity = useCallback(
    async (exclusivity) => {
      UserService.updateExclusivity(exclusivity);
      account.privateAccount = exclusivity;
      await setAccount(account);
    },
    [account]
  );

  const updateCustomLikeAmount = useCallback(
    async (amount) => {
      UserService.updateCustomLikeAmount(amount);
      account.customLikeAmount = amount;
      await setAccount(account);
    },
    [account]
  );

  return {
    oneClickPayments,
    setOneClickPayments,
    updateExclusivity,
    updateCustomLikeAmount
  };
};

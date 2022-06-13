import { useCallback } from "react";
import UserService from "../services/UserService";

export function useActiveWallet() {
  const getActiveWallet = useCallback(async () => {
    const response = await UserService.getActiveWallet();
    if (response && response.data && response.data.activeWallet) {
      return response.data.activeWallet;
    }
  }, []);

  return { getActiveWallet };
}

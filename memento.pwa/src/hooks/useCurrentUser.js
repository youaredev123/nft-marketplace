import { useCallback } from "react";
import { refreshCurrentUser } from "api";
import { useAccount } from "hooks/useAccount";
import { fetchToken, removeToken } from "lib/tokenizer";

const useCurrentUser = () => {
  let userId = null;
  const tokenData = fetchToken();
  if (tokenData && tokenData.token && tokenData.userId) {
    userId = tokenData.userId;
  } else {
    removeToken();
  }
  const { account: currentUser, setAccount: setCurrentUser } = useAccount();

  const fetchCurrentUser = useCallback(async () => {
    const tokenData = fetchToken();
    if (tokenData && tokenData.token && tokenData.userId) {
      const user = await refreshCurrentUser();
      if (user && user.id) {
        setCurrentUser(user);
      }
    } else {
      removeToken();
      window.location.href = "/";
    }
  });

  return {
    currentUser,
    setCurrentUser,
    fetchCurrentUser,
  };
};

export default useCurrentUser;

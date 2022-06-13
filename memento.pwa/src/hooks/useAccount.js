import React, { useContext, useEffect } from "react";
import { refreshCurrentUser, clearDb } from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { setToken, fetchToken, removeToken } from "../lib/tokenizer";
import UserService from "../services/UserService";

const AccountContext = React.createContext();

export function AccountProvider({ children }) {
  let userId = null;
  const tokenData = fetchToken();
  if (tokenData && tokenData.token && tokenData.userId) {
    userId = tokenData.userId;
  } else {
    removeToken();
  }
  const [account, setAccount] = useLocalStorage("relica_user", {
    id: userId
  });
  const [mbToken, setMbToken, hydrateMbToken] = useLocalStorage(
    "mb_js_client:oauth_access_token",
    null
  );
  const [hcToken, setHcToken] = useLocalStorage("handcash_token", null);

  useEffect(() => {
    if (!account) {
      return;
    }
    if (!account.wallets && account.id) {
      setAccount({
        ...account,
        wallets: {
          moneybutton: {
            oneClick: false,
            active: true
          },
          handcash: {
            oneClick: true,
            active: false
          }
        }
      });
    }
  }, [account]);

  const getWalletType = (account) => {
    if (
      !account ||
      account.id === null ||
      typeof account.wallets !== "object"
    ) {
      return null;
    }
    return Object.entries(account.wallets).find(
      ([provider, wallet]) => wallet.active
    )[0];
  };
  const walletType = getWalletType(account);

  async function login({ provider, authToken, id }) {
    const loginFn =
      provider === "moneybutton"
        ? UserService.loginMoneyButton
        : UserService.loginHandCash;
    const response = await loginFn({ authToken, id });
    if (!response.hasError) {
      setToken(response.data.jwtToken, response.data.userId);
      if (provider !== "moneybutton") {
        setMbToken(null);
      }
      const account = await refreshCurrentUser();
      if (account && account.id) {
        await clearDb();
        setAccount(account);
      }
    }
    return response;
  }

  async function signup({
    provider,
    username,
    profilePicLocation,
    id,
    authToken,
    referrerUserId
    // exclusivity,
    // pricePerLike,
    // not using adult at the moment
    // adult
  }) {
    const signupFn =
      provider === "moneybutton"
        ? UserService.signupMoneyButton
        : UserService.signupHandCash;
    const response = await signupFn({
      username,
      profilePicLocation,
      id,
      authToken,
      referrerUserId
      // exclusivity,
      // pricePerLike,
      // adult
    });
    if (!response.hasError) {
      setToken(response.data.jwtToken, response.data.userId);
      const account = await refreshCurrentUser();
      if (account && account.id) {
        await clearDb();
        setAccount(account);
      }
    }
    return response;
  }

  async function hydrateUser() {
    const tokenData = fetchToken();
    if (tokenData && tokenData.token && tokenData.userId) {
      const account = await refreshCurrentUser();
      if (account && account.id) {
        setAccount(account);
      }
    } else {
      removeToken();
      window.location.href = "/";
    }
  }

  async function logout() {
    setMbToken(null); // to prevent re-logging in
    setAccount(null);

    // clean every token
    localStorage.removeItem("relica_imb_token");
    localStorage.removeItem("mb_js_client:oauth_expiration_time");
    localStorage.removeItem("mb_js_client:oauth_state");
    localStorage.removeItem("mb_js_client:oauth_refresh_token");
    localStorage.removeItem("mb_js_client:oauth_redirect_uri");
    localStorage.removeItem("mb_js_client:oauth_access_token");
    localStorage.removeItem("handcash_token");
    localStorage.removeItem("token_timestamp");
    localStorage.removeItem("relica_wallets");

    removeToken();
  }

  async function dropMbToken() {
    setMbToken(null);
  }

  const loggedIn = account && account.id ? true : false;

  const value = {
    account,
    setAccount,
    mbToken,
    hydrateMbToken,
    hcToken,
    setHcToken,
    dropMbToken,
    hydrateUser,
    logout,
    login,
    signup,
    loggedIn,
    walletType
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}

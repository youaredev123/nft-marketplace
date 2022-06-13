import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect
} from "react";
import { MoneyButtonClient } from "@moneybutton/api-client";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OAuthIdentifier = `${process.env.REACT_APP_MB_OAUTH}`;
const clientIdentifier = `${process.env.REACT_APP_MB_CLIENT}`;

const MoneyButtonContext = React.createContext(undefined);

export function MoneyButton({ children }) {
  const [user, setUser] = useState(undefined);
  const clientRef = useRef(new MoneyButtonClient(OAuthIdentifier));
  const [, setMbToken, , removeValue] = useLocalStorage(
    "mb_js_client:oauth_access_token"
  );

  const refreshMoneyButton = useCallback(async () => {
    // remove the token completeky
    removeValue("mb_js_client:oauth_access_token");
    // get the new one
    const request = await clientRef.current.getValidAccessToken();
    // request sometimes returns " ' \ symbols
    const cleanRequest = request.replace(/['"\\]+/g, "");
    setMbToken(cleanRequest);
  }, [clientRef]);

  const load = useCallback(async () => {
    try {
      let identity = await clientRef.current.getIdentity();
      let accessToken = await clientRef.current.getAccessToken();
      let profile = await clientRef.current.getUserProfile(identity.id);
      setUser({ identity, profile, accessToken });
    } catch (err) {
      console.error(err);
    }
  }, [clientRef, setUser]);

  const handleAuthorizationResponse = useCallback(
    async (onAuthorizationResponse) => {
      await clientRef.current.handleAuthorizationResponse();
      if (onAuthorizationResponse) {
        onAuthorizationResponse();
      }
      await load();
    },
    [clientRef, load]
  );
  // TODO: Change from hardcoded path proper redirect
  const requestAuthorization = useCallback(async () => {
    await clientRef.current.requestAuthorization(
      "auth.user_identity:read users.profiles:read",
      process.env.REACT_APP_OAUTH_URL
    );
  }, [clientRef]);

  useEffect(() => {
    load();
  }, [clientRef, load]);

  const value = {
    refreshMoneyButton,
    requestAuthorization,
    user,
    clientIdentifier,
    handleAuthorizationResponse
  };

  return (
    <MoneyButtonContext.Provider value={value}>
      {children}
    </MoneyButtonContext.Provider>
  );
}

export function useMoneyButton() {
  return useContext(MoneyButtonContext);
}

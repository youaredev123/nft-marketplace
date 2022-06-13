import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";

const { HandCashConnect } = require('@handcash/handcash-connect');

const HandCashContext = React.createContext(undefined);
export function HandCashProvider({ children }) {
  const clientRef = useRef(
    new HandCashConnect(process.env.REACT_APP_HC_CLIENT));
  const [ user, setUser ] = useState(null);
  const [ authorizationUrl, setAuthorizationUrl ] = useState(null);

  useEffect(() => {
    (async () => {
      setAuthorizationUrl(
        await clientRef.current.getRedirectionUrl());
    })();
  }, [clientRef.current, setAuthorizationUrl]);

  const handleAuthorizationResponse = useCallback(async (token, onError) => {
    const account = clientRef.current.getAccountFromAuthToken(token);
    try {
      const { publicProfile } = await account.profile.getCurrentProfile();
      setUser(publicProfile);
    } catch (e) {
      console.log('Failed to get current profile from HandCash: ' + e)
      // the token is dead
      onError();
    }
  }, [clientRef.current, setUser]);

  const value = {
    authorizationUrl,
    handleAuthorizationResponse,
    user,
    client: clientRef.current,
  };
  return (
    <HandCashContext.Provider value={value}>
      {children}
    </HandCashContext.Provider>
  );
}

export function useHandCash() {
  return useContext(HandCashContext);
}

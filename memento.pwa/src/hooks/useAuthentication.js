import { useEffect } from "react";
import { useAccount } from "./useAccount";
import { useMoneyButton } from "./useMoneyButton";
import { fetchToken } from "../lib/tokenizer";
import UserService from "../services/UserService";
import { useHandCash } from "./useHandCash";

export default (isAuthorizing) => {
  const { requestAuthorization } = useMoneyButton();
  const { handleAuthorizationResponse } = useHandCash();
  const { account, mbToken, hcToken, setHcToken } = useAccount();
  const hasMbToken = !!mbToken;
  const relicaToken = fetchToken();
  const hasRelicaToken =
    relicaToken && relicaToken.token && relicaToken.token.length;
  const wasARegisteredUserOnce = account && account.id;

  useEffect(() => {
    if (!hasRelicaToken) {
      if (hasMbToken && !isAuthorizing && wasARegisteredUserOnce) {
        // The user used to have MB token but is missing Relica token.
        // If they have information about their user (not if e.g.
        // they've just logged in with MB for the first time
        // and haven't created the user yet), try automatically authorize
        requestAuthorization();
      } else if (!!hcToken && !isAuthorizing && wasARegisteredUserOnce) {
        handleAuthorizationResponse(hcToken, () => setHcToken(null));
      }
    }
  }, [isAuthorizing, relicaToken, hasMbToken, hcToken]);

  return {
    userAllowedToBrowseInnerRoutes: !isAuthorizing &&
      (hasRelicaToken || hasMbToken) && wasARegisteredUserOnce,
  };
}

import { useAccount } from "./useAccount";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function useLoggedInRedirect() {
  const { loggedIn } = useAccount();
  const { push } = useHistory();
  useEffect(() => {
    if (loggedIn) {
      push("/");
    }
  }, [push, loggedIn]);
}

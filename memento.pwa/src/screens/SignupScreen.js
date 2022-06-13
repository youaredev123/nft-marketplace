import React from "react";
import { useLoggedInRedirect } from "../hooks/useLoggedInRedirect";

export function SignupScreen() {
  useLoggedInRedirect();

  return <div>Sign up</div>;
}

import React from "react";
import MoneyButton from "@moneybutton/react-money-button";
import { useMoneyButton } from "../hooks/useMoneyButton";

export default (props) => {
  const { clientIdentifier, refreshMoneyButton } = useMoneyButton();

  // refresh
  React.useEffect(() => {
    refreshMoneyButton();
  }, [refreshMoneyButton]);

  return (
    <MoneyButton clientIdentifier={clientIdentifier} {...props} preserveOrder />
  );
};

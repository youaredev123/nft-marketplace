import React from "react";
import MoneyButton from "@moneybutton/react-money-button";
import { useMoneyButton } from "../../../hooks/useMoneyButton";
import { usePost } from "../../../hooks/usePost";

const BaseButton = (props) => {
  const { clientIdentifier } = useMoneyButton();
  return <MoneyButton clientIdentifier={clientIdentifier} {...props} />;
};

export default ({ id, data }) => {
  const { updateLikes } = usePost(id);
  return (
    <BaseButton
      buttonId="LIKE"
      label="Like"
      type="tip"
      successMessage="Like posted"
      outputs={[
        {
          to: data.appAddress,
          amount: data.appPaymentAmount,
          currency: "USD",
        },
        {
          to: data.toUserId,
          amount: data.userPaymentAmount,
          currency: "USD",
        },
      ]}
      onPayment={() => {
        updateLikes();
      }}
      buttonData={data.buttonData}
    />
  );
};

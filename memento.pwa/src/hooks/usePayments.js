import React, { useCallback, useContext, useRef, useState } from "react";

import MoneyButtonWrapper from "@moneybutton/react-money-button";
import { useAccount } from "hooks/useAccount";
import { useActiveWallet } from "hooks/useActiveWallet";
import useToast from "../hooks/useToast";
import BlockChainService from "../services/BlockChainService";
import { useHandCash } from "./useHandCash";
import { useMoneyButton } from "./useMoneyButton";
import { useLocalStorage } from "hooks/useLocalStorage";
import TransactionCompleteMessage from "../components/Toasts/TransactionCompleteMessage";
import GenericMessage from "../components/Toasts/GenericMessage";
import WideToast from "../components/Toasts/WideToast";
import { checkNeedRefresh } from "lib/dateTime";

const invisibleMoneyButtonMinimumAmountUSD = "0.1";
const invisibleMoneyButtonSuggestedAmountUSD = "11";

const buildMoneyButtonProps = (
  {
    type,
    label,
    successMessage,
    onPayment,
    onError,
    data,
    customOutputs,
    buttonData
  }
) => {
  if (!data && !customOutputs) {
    return null;
  }

  const buttonProps = {
    label,
    buttonId: type,
    successMessage,
    outputs: [],
    buttonData: undefined,
    onPayment,
    onError,
    type: "tip",
    preserveOrder: true
  };
  if (customOutputs) {
    buttonProps.outputs = customOutputs;
    buttonProps.buttonData = buttonData;
    return buttonProps;
  }

  if (data.pictureScript && data.pictureScript.length) {
    buttonProps.outputs.push({
      script: data.pictureScript,
      amount: "0",
      currency: "USD"
    });
  }
  if (data.commentScript && data.commentScript.length) {
    buttonProps.outputs.push({
      script: data.commentScript,
      amount: "0",
      currency: "USD"
    });
  }
  for (let keyPair of [
    ["relicaAddress", "relicaPaymentAmount"],
    ["toUserPaymail", "toUserPaymentAmount"],
    ["referrerPaymail", "referrerPaymentAmount"]
  ]) {
    if (
      data[keyPair[0]] &&
      data[keyPair[0]].length > 0 &&
      data[keyPair[1]] &&
      data[keyPair[1]].length > 0
    ) {
      buttonProps.outputs.push({
        to: data[keyPair[0]],
        amount: data[keyPair[1]],
        currency: "USD"
      });
    }
  }
  if (data.buttonData && data.buttonData.length) {
    buttonProps.buttonData = data.buttonData;
  }

  return buttonProps;
};

const buildHandCashProps = ({ description, data }) => {
  let outputs = [];
  let attachments = [];
  if (data.hcCommentOutputs) {
    data.hcCommentOutputs.map((item) => {
      attachments.push(item);
    });
  }
  if (data.hcPictureOutputs) {
    data.hcPictureOutputs.map((item) => {
      attachments.push(item);
    });
  }
  for (let keyPair of [
    ["relicaAddress", "relicaPaymentAmount"],
    ["toUserPaymail", "toUserPaymentAmount"],
    ["referrerPaymail", "referrerPaymentAmount"]
  ]) {
    if (
      data[keyPair[0]] &&
      data[keyPair[0]].length > 0 &&
      data[keyPair[1]] &&
      data[keyPair[1]].length > 0
    ) {
      outputs.push({
        destination: data[keyPair[0]],
        sendAmount: data[keyPair[1]],
        currencyCode: "USD"
      });
    }
  }
  const attachment =
    attachments.length === 0
      ? undefined
      : {
        format: "hexArray",
        value: attachments
      };
  return {
    description,
    appAction: "RELICA",
    payments: outputs,
    attachment
  };
};

const paymentTypeToPrepareQuery = (type) => {
  switch (type) {
    case "LIKE":
      return BlockChainService.like;
    case "COMMENT":
      return BlockChainService.comment;
    case "FAVOURITE":
      return BlockChainService.addToFavourites;
    case "FOLLOW":
      return BlockChainService.follow;
    case "PICTURE":
      return BlockChainService.picture2;
    case "DARK_MODE":
      return BlockChainService.darkMode;
    case "MAPS":
      return BlockChainService.unlockMap;
    case "PRIVATE_ACCOUNT":
      return BlockChainService.privatePrepare;
    case "RELIC":
      return BlockChainService.relic;
  }
};

const paymentTypeToMoneyButtonProps = (type, data) => {
  switch (type) {
    case "LIKE":
      return { label: "swipe to like", successMessage: "Like success" };
    case "COMMENT":
      return { label: "swipe to post", successMessage: "Comment success" };
    case "FAVOURITE":
      return {
        label: "swipe to add",
        successMessage: "Adding to favourites success"
      };
    case "FOLLOW":
      return {
        label: data.follow ? "swipe to follow" : "to unfollow",
        successMessage: data.follow ? "Follow success" : "Unfollow success"
      };
    case "PICTURE":
      return {
        label: "swipe to post",
        successMessage: "Picture upload success"
      };
    case "DARK_MODE":
      return { label: "swipe to buy", successMessage: "Dark mode purchased" };
    case "MAPS":
      return { label: "swipe to unlock", successMessage: "Unlocked map" };
    case "PRIVATE_ACCOUNT":
      return {
        label: "swipe to buy",
        successMessage: "Private account purchased"
      };
  }
};

const createHcNote = (type, username, data) => {
  const usedUsername = username ? "@" + username : "somebody";
  const cutoff = (note) => {
    if (note.length <= 25) {
      return note;
    } else {
      return note.substring(0, 22) + "...";
    }
  };
  switch (type) {
    case "LIKE":
      return cutoff(`Liking ${usedUsername}'s post`);
    case "COMMENT":
      return cutoff(`Commenting ${usedUsername}'s post`);
    case "FAVOURITE":
      return cutoff(`Adding ${usedUsername}'s post to favourites`);
    case "FOLLOW":
      return cutoff(`${data.follow ? "F" : "Unf"}ollowing @${usedUsername}`);
    case "DARK_MODE":
      return cutoff("Buying dark mode");
    case "MAPS":
      return cutoff("Unlocking map");
    case "PICTURE":
      return cutoff("Uploading picture");
    case "PRIVATE_ACCOUNT":
      return cutoff("Buying private account");
  }
};

const PaymentsContext = React.createContext(undefined);

export function PaymentsProvider({ children }) {
  const { account, walletType, hcToken, mbToken } = useAccount();
  const { getActiveWallet } = useActiveWallet();
  const [tokenTimestamp] = useLocalStorage("token_timestamp");
  const needsMoneyButtonModal =
  walletType === "moneybutton" && !account.wallets[walletType].oneClick;

  const [showMoneyButtonModal, setShowMoneyButtonModal] = useState(false);
  const [moneyButtonModalProps, setMoneyButtonModalProps] = useState(undefined);
  const onMoneyButtonModalHideRef = useRef();

  const hideMoneyButtonModal = useCallback(() => {
    setShowMoneyButtonModal(false);
    if (onMoneyButtonModalHideRef.current) {
      onMoneyButtonModalHideRef.current();
    }
  }, [setShowMoneyButtonModal]);

  const { clientIdentifier, refreshMoneyButton } = useMoneyButton();

  const [imbClientPermission, setImbClientPermission] = useLocalStorage(
    "relica_imb_token",
    null
  );
  const imbConfig = {
    clientIdentifier,
    suggestedAmount: {
      amount: invisibleMoneyButtonSuggestedAmountUSD,
      currency: "USD"
    },
    minimumAmountUSD: {
      amount: invisibleMoneyButtonMinimumAmountUSD,
      currency: "USD"
    },
    permission: imbClientPermission,
    onNewPermissionGranted: setImbClientPermission
  };
  const imbClientReadyPromiseRef = useRef(null);

  const getInvisibleMoneyButtonClient = useCallback(
    (walletTypeConverted) => {
      if (walletTypeConverted !== "moneybutton") {
        console.error(
          "Relica: Requesting MB IMB object, but the current user is not from MB. " +
          "This will fail."
        );
        return Promise.resolve(null);
      }
      if (imbClientReadyPromiseRef.current === null) {
        const moneyButtonWrapper = new MoneyButtonWrapper();
        imbClientReadyPromiseRef.current = moneyButtonWrapper
          .iframeLoader()
          .then((moneyButton) => new moneyButton.IMB(imbConfig));
      }
      return imbClientReadyPromiseRef.current;
    },
    [getActiveWallet]
  );

  const { client: hcClient, authorizationUrl: hcAuthorizationUrl } =
    useHandCash();

  const requestsQueue = useRef(Promise.resolve(null));
  const runOnRequestsQueue = useCallback((promiseCreator) => {
    const requestsGapMilliseconds = 500;
    return new Promise((resolve, reject) => {
      requestsQueue.current = requestsQueue.current
        .then(() =>
          promiseCreator().then(
            (result) => resolve(result),
            (error) => reject(error)
          )
        )
        .then(
          () =>
            new Promise((resolve) =>
              setTimeout(resolve, requestsGapMilliseconds)
            )
        );
      return requestsQueue.current;
    });
  }, []);

  const { showToast } = useToast();

  const [activePayments, setActivePayments] = useState(new Set());
  const [recentPayments, setRecentPayments] = useState(new Set());
  const [viewProgressBar, setViewProgressBar] = useState(false);

  const pay = useCallback(
    async ({
             type,
             data,
             username,
             customOutputs,
             buttonData,
             // satoshiAmountOut,
             onPayment: onPaymentProvided,
             onError: onErrorProvided,
             onInvisiblePaymentStart: onInvisiblePaymentStartProvided,
             onMoneyButtonModalHide
           }) => {
      // We need to use active wallet we fetch from back-end
      // Since the user can change their active wallet on their phone
      // And be able to pay with active wallet
      // MONEY_BUTTON or HAND_CASH
      const activeWallet = await getActiveWallet();
      const walletTypeConverted =
        activeWallet === "HAND_CASH" ? "handcash" : "moneybutton";

      // we need to refresh MB token
      if (
        activeWallet === "MONEY_BUTTON" &&
        checkNeedRefresh(tokenTimestamp, 59)
      ) {
        refreshMoneyButton();
      }

      const onPayment = onPaymentProvided || (() => {
      });
      const onError = onErrorProvided || (() => {
      });
      const onInvisiblePaymentStart =
        onInvisiblePaymentStartProvided || (() => {
        });

      if (
        activeWallet === "HAND_CASH" ||
        account.wallets[walletTypeConverted].oneClick
      ) {
        if (onInvisiblePaymentStart) {
          onInvisiblePaymentStart();
        }
      }

      if (activeWallet === "HAND_CASH" && customOutputs) {
        console.error(
          "Relica: HandCash does not support custom outputs, " + "aborting."
        );
        onError("not supported");
        return;
      }

      const isPaymentUnique = type !== "COMMENT" && data;
      let uniquePaymentHandle;
      if (isPaymentUnique) {
        uniquePaymentHandle = `${type}:${JSON.stringify(data)}`;
        if (activePayments.has(uniquePaymentHandle)) {
          console.error(
            "Relica: unable to pay, this payment is already in " + "process."
          );
          onError("already started");
          return;
        }
      }

      setViewProgressBar(true);
      if (isPaymentUnique) {
        setActivePayments(activePayments.add(uniquePaymentHandle));
      }
      const onPaymentEnd = () => {
        if (isPaymentUnique) {
          setActivePayments((activePayments) => {
            activePayments.delete(uniquePaymentHandle);
            return activePayments;
          });
        }

        setViewProgressBar(false);
      };

      let prepareResponse;
      if (!customOutputs) {
        prepareResponse = await paymentTypeToPrepareQuery(type)(data);
        if (prepareResponse.hasError || !prepareResponse.data) {
          console.error("Relica: prepare error, response: ", prepareResponse);
          onError("prepare error");
          onPaymentEnd();
          return;
        }
      }

      const onSuccess = (paymentData) => {
        if (
          activeWallet === "MONEY_BUTTON" &&
          !account.wallets[walletTypeConverted].oneClick
        ) {
          // keep it for a bit to show the button
          // to the user in the "paid" state
          setTimeout(hideMoneyButtonModal, 1000);
        }
        if (
          activeWallet === "HAND_CASH" ||
          account.wallets[walletTypeConverted].oneClick
        ) {
          let cents;
          if (activeWallet === "MONEY_BUTTON") {
            const amountUsdNumber = Number(paymentData.amountUsd);
            const amountUsdCents = amountUsdNumber * 100;
            // cents = Number.parseFloat(amountUsdCents).toFixed(2);
            cents = Math.round((amountUsdCents + Number.EPSILON) * 100) / 100
          } else {
            // cents = Number.parseFloat(
            //   (paymentData.fiatExchangeRate * paymentData.satoshiAmount) /
            //   1000000
            // ).toFixed(2);
            
            cents = Math.round((((paymentData.fiatExchangeRate * paymentData.satoshiAmount) / 1000000) + Number.EPSILON) * 100) / 100
          }
          if (cents >= 100) {
            const format = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0
            });
            const dollars = format.format(cents / 100);
            showToast(<TransactionCompleteMessage amount={dollars}/>);
          } else {
            showToast(<TransactionCompleteMessage amount={cents + "¢"}/>);
          }
        }

        if (isPaymentUnique) {
          setRecentPayments((recentPayments) =>
            recentPayments.add(uniquePaymentHandle)
          );
        }

        onPaymentEnd();
        onPayment(
          activeWallet === "MONEY_BUTTON"
            ? paymentData.txid
            : paymentData.transactionId
        );
      };

      const onMoneyButtonError = (errorData) => {
        onPaymentEnd();

        if (errorData.message === "Insufficient balance.") {
          onError("no balance");
        } else if (
          errorData.message ===
          "No outputs were specified" + " and no cryptoOperations specified."
        ) {
          onError("no outputs");
        } else {
          console.error(
            "Relica: Unknown Money Button payment error: " + (errorData.message || errorData.reason)
          );
          onError("unknown");
        }
      };

      const propsBuilder =
        activeWallet === "MONEY_BUTTON"
          ? buildMoneyButtonProps
          : buildHandCashProps;
      let inputProps = {};
      if (activeWallet === "MONEY_BUTTON") {
        inputProps = {
          type,
          customOutputs,
          ...paymentTypeToMoneyButtonProps(type, data),
          buttonData: buttonData
        };
      } else if (activeWallet === "HAND_CASH") {
        inputProps = {
          description: createHcNote(type, username, data)
        };
      }
      inputProps = {
        ...inputProps,
        onPayment: onSuccess,
        onError: onMoneyButtonError,
        data: prepareResponse?.data
      };
      const walletProps = propsBuilder(inputProps);

      switch (activeWallet) {
        case "MONEY_BUTTON":
          if (!mbToken) {
            // Looks like mb token get's refreshed
            console.log("No MB token");
            // break;
          }

          if (account.wallets[walletTypeConverted].oneClick) {
            const imbClient = await getInvisibleMoneyButtonClient(
              walletTypeConverted
            );
            try {
              await runOnRequestsQueue(() => imbClient.swipe(walletProps));
            } catch (e) {
              onMoneyButtonError(e);
            }
          } else {
            onMoneyButtonModalHideRef.current = () => {
              if (onMoneyButtonModalHide) {
                onMoneyButtonModalHide();
              }
              onPaymentEnd();
            };

            setMoneyButtonModalProps(walletProps);
            setShowMoneyButtonModal(true);
          }
          break;
        case "HAND_CASH":
          // if there's no hc token then log in to hc once again
          if (!hcToken) {
            window.location = hcAuthorizationUrl
              ? hcAuthorizationUrl
              : `https://app.handcash.io/#/authorizeApp?appId=${hcClient.appId}`;
            break;
          }

          let paymentResult;
          try {
            const hcAccount = hcClient.getAccountFromAuthToken(hcToken);
            paymentResult = await runOnRequestsQueue(() =>
              hcAccount.wallet.pay(walletProps)
            );
          } catch (e) {
            console.log("Relica: HandCash error:", e);
            onPaymentEnd();
            if (e.message === "Insufficient funds.") {
              showToast(<GenericMessage text="Please check your balance"/>);
              onError("no balance");
            } else if (e.message === "Request failed with status code 409") {
              showToast(
                <WideToast text="Please check your HandCash authorized amount to spend"/>
              );
              onError("no balance");
            } else if (
              e.message === '"receivers" must contain at least 1 items'
            ) {
              onError("no outputs");
            } else {
              onError("unknown");
            }
            return;
          }
          try {
            await BlockChainService.notifyHcSuccess({
              type,
              buttonData: prepareResponse.data.buttonData,
              txId: paymentResult.transactionId
            });
          } catch (e) {
            console.error("Relica: Backend notify HC error");
          }
          onSuccess(paymentResult);
          break;
      }
    },
    [
      account,
      walletType,
      hcToken,
      activePayments,
      getInvisibleMoneyButtonClient,
      hcClient,
      hideMoneyButtonModal,
      runOnRequestsQueue,
      showToast
    ]
  );

  const isPaymentActiveOrRecent = useCallback(
    ({ type, data }) => {
      return (
        activePayments.has(`${type}:${JSON.stringify(data)}`) ||
        recentPayments.has(`${type}:${JSON.stringify(data)}`)
      );
    },
    [activePayments, recentPayments]
  );

  const value = {
    pay,
    needsMoneyButtonModal,
    showMoneyButtonModal,
    hideMoneyButtonModal,
    moneyButtonModalProps,
    viewProgressBar,
    isPaymentActiveOrRecent
  };

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  return useContext(PaymentsContext);
}

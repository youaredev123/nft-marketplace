import React, { useCallback, useState } from "react";
import confetti from "canvas-confetti";
import { useUserSettings } from "hooks/useUserSettings";
import { useAccount } from "hooks/useAccount";
import { usePayments } from "hooks/usePayments";
import { useHistory } from "react-router-dom";
import ExclusivityScreenMobile from "./Mobile";
import ExclusivityScreenDesktop from "screens/ExclusivityScreen/Desktop";
import { DesktopWr, MobileWr } from "screens/ExclusivityScreen/styles";

const ExclusivityScreen = ({ purchasedPrivate, showDesktop = true, showMobile = true }) => {
  // maximum amount of $ inside the slider
  const max = 10;
  // maximum amount of $ inside the input
  const inputMax = 100;
  // minimum amount of $ per all components (slider / input)
  const min = 0.01;
  // change step when user is focused on the input and uses up/down arrows
  const step = 0.05;

  const { account, setAccount } = useAccount();
  const { pay } = usePayments();
  const history = useHistory();

  const [exclusivity, setExclusivity] = useState(
    account.privateAccount || false
  );
  const [pricePerLike, setPricePerLike] = useState(
    account.customLikeAmount || min
  );
  const [sliderValue, setSliderValue] = useState((pricePerLike / max) * 105);
  const { updateExclusivity, updateCustomLikeAmount } = useUserSettings();

  const handleExclusivityChange = (exclusive) => () => {
    setExclusivity(exclusive);
  };

  // slider has 105 positions (1,2,3...105)
  // first steps are 0.01->0.02->0.03->0.04->0.05
  // starting 0.05 next position is 0.10 and step is 0.10
  // so 0.10 -> 0.20 -> 0.30 -> ... -> $10
  // 0, 1th position (left) is 0.01 (min value)
  // 2nd position is 0.02
  // 3rd position is 0.03
  // 4th position is 0.04
  // 5th position is 0.05
  // 6th position is 0.10
  // 7th position is 0.20
  // 105th (right) is $10 (max)

  const handlePriceChange = (val) => {
    setSliderValue(val);
    if (val === 0 || val === 1) {
      setPricePerLike(min);
    } else if (val === 2) {
      setPricePerLike(0.02);
    } else if (val === 3) {
      setPricePerLike(0.03);
    } else if (val === 4) {
      setPricePerLike(0.04);
    } else if (val === 5) {
      setPricePerLike(0.05);
    } else {
      const decreasedVal = val - 4;
      const priceNotRounded = (max * decreasedVal) / 100 - max / 100;
      const priceRounded = Math.round(priceNotRounded * 100) / 100;
      setPricePerLike(priceRounded);
    }
  };

  const handleSave = async () => {
    // set exclusive (private) or public account
    updateExclusivity(exclusivity);

    if (account.privateAccount) {
      updateCustomLikeAmount(pricePerLike);
    } else {
      if (exclusivity) {
        // if exclusive (private) - set price per like
        updateCustomLikeAmount(pricePerLike);
      }
    }
  };

  const handleSaveButtonClick = () => {
    handleSave();
    history.goBack();
  };

  const handleInputChange = (value) => {
    if (value > inputMax) {
      value = inputMax;
    }

    if (value && value >= min) {
      setSliderValue((value / max) * 105);
    }

    setPricePerLike(value);
  };

  const handleInputBlur = () => {
    let value = pricePerLike;

    if (!value || value < min) {
      value = min;
    }

    if (value > inputMax) {
      value = inputMax;
    }

    setPricePerLike(value);
    setSliderValue((value / max) * 105);
  };

  const purchasePrivate =
    purchasedPrivate ||
    (account && account.purchases && account.purchases.privateAccount);

  const handlePurchaseButtonClick = () => {
    const onPayment = () => {
      const myCanvas = document.createElement("canvas");
      document.getElementById("root").appendChild(myCanvas);

      myCanvas.setAttribute(
        "style",
        `
          position: fixed;
          width: 100vw;
          top: 0px;
          height: 100vh;
          left: 0;
          min-width: 480px;
        `
      );

      const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
      });

      myConfetti({
        particleCount: 250,
        spread: 400
      });

      setTimeout(() => {
        myCanvas.remove();
      }, 3800);

      if (!account.purchases) {
        account.purchases = {};
      }

      account.purchases.privateAccount = true;
      setPrivatePurchased(true);
    };

    pay({
      type: "PRIVATE_ACCOUNT",
      data: {
        enabled: true
      },
      onPayment,
      onError: console.error
    });
  };

  const setPrivatePurchased = useCallback(async () => {
    if (!account || !account.purchases || !account.purchases.privateAccount) {
      console.error(
        "Relica: Attempting to switch to private account using an account that didn't pay for it."
      );
      return;
    }

    const purchases = { ...account.purchases };
    purchases.privateAccount = true;

    setAccount({ ...account, purchases });
    updateExclusivity(true);
    updateCustomLikeAmount(0.05);
  }, [purchasePrivate, account, setAccount]);

  return (
    <>
      {showDesktop && (
        <DesktopWr>
          <ExclusivityScreenDesktop
            exclusivity={exclusivity}
            handleExclusivityChange={handleExclusivityChange}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            handlePriceChange={handlePriceChange}
            handleSave={handleSave}
            handleSaveButtonClick={handleSaveButtonClick}
            handlePurchaseButtonClick={handlePurchaseButtonClick}
            pricePerLike={pricePerLike}
            purchasePrivate={purchasedPrivate}
            sliderValue={sliderValue}
            step={step}
          >
          </ExclusivityScreenDesktop>
        </DesktopWr>
      )}
      {showMobile && (
        <MobileWr>
          <ExclusivityScreenMobile
            exclusivity={exclusivity}
            handleExclusivityChange={handleExclusivityChange}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            handlePriceChange={handlePriceChange}
            handleSave={handleSave}
            handleSaveButtonClick={handleSaveButtonClick}
            handlePurchaseButtonClick={handlePurchaseButtonClick}
            pricePerLike={pricePerLike}
            purchasePrivate={purchasedPrivate}
            sliderValue={sliderValue}
            step={step}
          >
          </ExclusivityScreenMobile>
        </MobileWr>
      )}
    </>
  );
};

export default ExclusivityScreen;

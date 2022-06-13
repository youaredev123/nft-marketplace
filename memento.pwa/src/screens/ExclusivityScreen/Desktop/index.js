import React from "react";
import PurchasePrivateDesktop from "./PurchasePrivateDesktop";
import ExclusivityDesktop from "screens/ExclusivityScreen/Desktop/ExclusivityDesktop";

const ExclusivityScreenDesktop = (
  {
    handleSave,
    purchasePrivate,
    exclusivity,
    handleExclusivityChange,
    sliderValue,
    pricePerLike,
    handlePriceChange,
    handleInputChange,
    handleInputBlur,
    step,
    handleSaveButtonClick,
    handlePurchaseButtonClick
  }
) => {

  return (
    <>
      {purchasePrivate ? (
        <ExclusivityDesktop
          exclusivity={exclusivity}
          onExclusivityChange={handleExclusivityChange}
          sliderValue={sliderValue}
          pricePerLike={pricePerLike}
          onPriceChange={handlePriceChange}
          onInputChange={handleInputChange}
          onInputBlur={handleInputBlur}
          step={step}
          onSaveButtonClick={handleSaveButtonClick}
        />
      ) : (
        <PurchasePrivateDesktop onPurchaseButtonClick={handlePurchaseButtonClick}/>
      )}
    </>
  );
};

export default ExclusivityScreenDesktop;

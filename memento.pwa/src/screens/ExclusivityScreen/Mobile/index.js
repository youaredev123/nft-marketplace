import Header from "components/Header";
import { Title } from "components/Header/styles";
import PurchasePrivateMobile from "screens/ExclusivityScreen/Mobile/PurchasePrivateMobile";
import React from "react";
import ExclusivityMobile from "screens/ExclusivityScreen/Mobile/ExclusivityMobile";

const ExclusivityScreenMobile = (
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
      <Header
        title={<Title>Pay-to-View</Title>}
        hasBack
        backFunction={handleSave}
      />
      {purchasePrivate ? (
        <ExclusivityMobile
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
        <PurchasePrivateMobile onPurchaseButtonClick={handlePurchaseButtonClick} />
      )}
    </>
  )
}

export default ExclusivityScreenMobile;

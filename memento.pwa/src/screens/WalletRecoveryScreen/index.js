import React, { useState, createRef, useCallback } from "react";
import SeedScreen from "./SeedScreen";
import WalletLoginScreen from "../WalletLoginScreen";

const WalletRecoveryScreen  = () => {
  const [step, setStep] = useState(0);
  const [seed, setSeed] = useState('');
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 0 && <WalletLoginScreen handleNext={handleNext} setSeed={setSeed} />}
      {step === 1 && <SeedScreen seed={seed} />}
    </>
  );
}

export default WalletRecoveryScreen;

import React from "react";

// import Exclusivity from "./Exclusivity";
// import Adult from "./Adult";
import UsernamePhotoDesktop from "./UsernamePhoto";
import { DesktopWrapper } from "styles/layout";

const CreateUserScreenDesktop = ({ onSave }) => {
  // commented out most of the components since the only thing available now is to make a username
  // no exclusivity (private/public) or adult content

  // const [step, setStep] = useState(0);
  // const [exclusivity, setExclusivity] = useState(false);
  // const [pricePerLike, setPricePerLike] = useState(0.05);
  // const [adult, setAdult] = useState(false);

  // const handleNext = () => {
  //   if (step === 1) {
  //     console.log("finish");
  //   } else {
  //     setStep(step + 1);
  //   }
  // };

  // const handlePrevious = () => {
  //   setStep(step - 1);
  // };

  // not using adult at the moment
  // const handleAdultChange = (value) => () => {
  //   setAdult(value);
  // };

  return (
    <DesktopWrapper>
      {/* {step === 0 && (
        <Exclusivity
          onNext={handleNext}
          exclusivity={exclusivity}
          setExclusivity={setExclusivity}
          pricePerLike={pricePerLike}
          setPricePerLike={setPricePerLike}
        />
      )} */}
      {/* we're not using adult at the moment */}
      {/* {step === 1 && (
        <Adult
          onNext={handleNext}
          onPrevious={handlePrevious}
          adult={adult}
          onAdultChange={handleAdultChange}
        />
      )} */}
      {/* {step === 1 && ( */}
      <UsernamePhotoDesktop
        onSave={onSave}
        // onPrevious={handlePrevious}
        // exclusivity={exclusivity}
        // pricePerLike={pricePerLike}
        // adult={adult}
      />
      {/* )} */}
    </DesktopWrapper>
  );
};

export default CreateUserScreenDesktop;

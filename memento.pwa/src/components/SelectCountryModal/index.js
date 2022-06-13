import React, { useContext } from "react";
import ModalContainer from "../ModalContainer";

import { ModalHeaderContainer, MoneyButtonModalContent, } from "../ModalContainer/styles";
import { ReactComponent as LeftArrow } from "../../assets/icons/left-arrow2.svg";
import { Title, TitleContainer } from "../Header/styles";
import { DarkModeContext } from "hooks/useDarkMode";
import SelectCountryContent from "components/SelectCountryModal/SelectCountryContent";

const SelectCountryModal = ({ show, setShowingSelectCountryPopup, gmapRef = null, onCountryClick = null, countries = [] }) => {
  const theme = useContext(DarkModeContext);

  return (
    <ModalContainer show={show} customBody={true} onClose={() => setShowingSelectCountryPopup(false)} height="100vh">
      <MoneyButtonModalContent style={{ height: "100%" }}>
        <ModalHeaderContainer style={{
          borderRadius: "0px",
          boxShadow: theme.darkMode ? "0px 1px 2px rgb(255 255 255 / 20%)" : "0px 1px 2px rgb(0 0 0 / 20%)",
          padding: "6px 0"
        }}>
          <TitleContainer>
            <LeftArrow
              strokeWidth={1.5}
              color="var(--grey)"
              size={32}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() => setShowingSelectCountryPopup(false)}
            />
            <Title onClick={() => setShowingSelectCountryPopup(false)}>Select Country</Title>
          </TitleContainer>
        </ModalHeaderContainer>
        <SelectCountryContent gmapRef={gmapRef} onCountryClick={onCountryClick} countries={countries}/>
      </MoneyButtonModalContent>
    </ModalContainer>
  );
};

export default SelectCountryModal;

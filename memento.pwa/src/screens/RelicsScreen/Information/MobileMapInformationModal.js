import { ModalHeaderContainer, MoneyButtonModalContent } from "components/ModalContainer/styles";
import ModalContainer from "components/ModalContainer";
import React, { useContext } from "react";
import MapFAQInformation from "./MapFAQInformation";
import { Title, TitleContainer } from "components/Header/styles";
import { ReactComponent as LeftArrow } from "assets/icons/left-arrow2.svg";
import { DarkModeContext } from "hooks/useDarkMode";

const MobileMapInformationModal = ({ show, onHide }) => {
  const theme = useContext(DarkModeContext);

  return (
    <ModalContainer show={show} customBody={true} onClose={onHide} height="100vh">
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
              onClick={onHide}
            />
            <Title onClick={onHide}>GPS</Title>
          </TitleContainer>
        </ModalHeaderContainer>
        <MapFAQInformation/>
      </MoneyButtonModalContent>
    </ModalContainer>
  );
};

export default MobileMapInformationModal;

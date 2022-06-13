import React, { useState } from "react";
import styled from "styled-components";
import LogoIcon from "assets/images/memento_logo.png";
import { ReactComponent as MoneyButtonCloseIcon } from "../../assets/icons/minus.svg";
import { ReactComponent as RelicaWord } from "../../assets/images/relica-word-white.svg";
import ModalContainer from "../ModalContainer";
import Spinner from "../../components/Loader";

import {
  MoneyButtonModalContent,
  MoneyButtonModalHeaderContainer,
} from "../ModalContainer/styles";

import MoneyButton from "../MoneyButton";

const MoneyButtonContainer = styled.div`
  padding: 1.3em;

  > div {
    display: flex;
    justify-content: center;
    width: 100% !important;
    height: 200px !important;
  }
`;

export default ({ show, onHide, moneyButtonProps }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  function onLoad() {
    setTimeout(() => {
      setShowSpinner(false);
    }, 5000);
  }
  return (
    <ModalContainer customBody={true} show={show} onClose={onHide}>
      <MoneyButtonModalContent>
        <MoneyButtonModalHeaderContainer>
          <img src={LogoIcon} width={50} height={50} alt={"Logo"}/>
          <RelicaWord style={{ height: 30, width: "100%", marginRight: 27 }} />
          <MoneyButtonCloseIcon
            width={27}
            height={22}
            fill="none"
            onClick={onHide}
          />
        </MoneyButtonModalHeaderContainer>
        <MoneyButtonContainer>
          {showSpinner && <Spinner style={{ marginTop: "30px" }} />}
          <MoneyButton {...{ ...moneyButtonProps, onLoad }} />
        </MoneyButtonContainer>
      </MoneyButtonModalContent>
    </ModalContainer>
  );
};

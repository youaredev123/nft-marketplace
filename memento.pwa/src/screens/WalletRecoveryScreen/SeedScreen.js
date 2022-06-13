import React, { useState, createRef, useCallback } from "react";
import Button from "../../components/Button";
import { isPwa } from "../../components/AuthLayout";
import { ButtonTextContainer, HighlightTextContainer, Reminder } from "./styles";
import { ReactComponent as CopyIcon } from "../../assets/icons/Relica_copy.svg";
import Header from "../../components/Header";
import { Title } from "../../components/Header/styles";
import useToast from "../../hooks/useToast";
import GenericMessage from "../../components/Toasts/GenericMessage";

const SeedScreen  = ({ seed }) => {
  const { showToast } = useToast();
  return (
    <>
      <Header hasBack title={<Title>Recovery Phrase</Title>} />
      <Reminder>
        Please ensure your 12 word recovery phrase is written down and kept in a safe location.
      </Reminder>
      <HighlightTextContainer>
        {seed}
      </HighlightTextContainer>

      <Button
        className="primary"
        style={{
          padding: "17px",
          fontSize: "18px",
          width: "80%",
          margin: `25px auto ${
            window.mobileCheck() && !isPwa() ? "75px" : "25px"
          }`
        }}
        onClick={() => {
          window.navigator.clipboard.writeText(seed);
          showToast(<GenericMessage text="Copied to clipboard" />);
        }}
      >
        <ButtonTextContainer>
          <CopyIcon style={{margin: '0 10px -3px 0'}} />
          Copy Recovery Phrase
        </ButtonTextContainer>
      </Button>
    </>
  );

}

export default SeedScreen;

import React from "react";
import ModalContainer from "../../../../components/ModalContainer";
import {ListEntry, ModalHeaderContainer, MoneyButtonModalContent} from "../../../../components/ModalContainer/styles";

const sorterNames = {
  "Most Recent": "Most Recent",
  "Highest Price": "Highest Price",
  "Lowest Price": "Lowest Price",
};

export default ({ show, sorter, setSorter }) => {
  const sorterEntry = listedSorter => (
    <ListEntry target="_blank" onClick={() => setSorter(listedSorter)} style={{padding: "1.5rem"}}>
      {sorterNames[listedSorter]}
    </ListEntry>
  );

  return (
    <ModalContainer show={show} customBody={true} onClose={() => setSorter(sorter)} height="auto">
      <MoneyButtonModalContent>
        <ModalHeaderContainer>
          Sort by
        </ModalHeaderContainer>
        <div style={{ height: "1.5rem" }} />
        {sorterEntry("Most Recent")}
        {sorterEntry("Highest Price")}
        {sorterEntry("Lowest Price")}
      </MoneyButtonModalContent>
    </ModalContainer>
  );
};

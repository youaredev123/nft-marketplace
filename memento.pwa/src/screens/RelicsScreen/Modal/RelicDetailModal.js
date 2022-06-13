import ModalContainer from "components/ModalContainer";
import { ModalContent } from "components/ModalContainer/styles";
import React from "react";
import RelicScreen from "screens/RelicsScreen/RelicScreen";
import "./RelicDetailModal.scss";
import { X } from "react-feather";

const RelicDetailModal = (
  {
    relic,
    show,
    onHide
  }
) => {
  if (!relic) return null;

  return (
    <ModalContainer show={show} onClose={onHide} customBody={true} width={'120vh'}>
      {/* Back button - X*/}
      <div className={"relic-modal-custom-back-btn"} onClick={onHide}>
        <X/>
      </div>
      <ModalContent>
        <div className={"relic-detail-modal"}>
          <RelicScreen relicId={relic.id} showHeader={false}/>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default RelicDetailModal;

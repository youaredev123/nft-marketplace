import ModalContainer from "components/ModalContainer";
import React from "react";
import RelicCreatePhotoScreen from "screens/RelicsScreen/RelicCreatePhotoScreen";
import "./CreateRelicPhotoModal.scss";

const CreateRelicPhotoModal = (
  {
    show,
    onHide,
    x,
    y,
    onPaySuccessCallback = null,
    onBeforePayCallback = null
  }
) => {
  return (
    <ModalContainer show={show} onClose={onHide} title={"Create Relic"}>
      <RelicCreatePhotoScreen
        onPaySuccessCallback={onPaySuccessCallback}
        onBeforePayCallback={onBeforePayCallback}
        classes={'relic-create-photo-modal'}
        hideHeader
        getFromQuery={false}
        inputX={x}
        inputY={y}
      />
    </ModalContainer>
  );
};

export default CreateRelicPhotoModal;

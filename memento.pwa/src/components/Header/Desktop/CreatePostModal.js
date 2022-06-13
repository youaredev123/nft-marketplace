import ModalContainer from "components/ModalContainer";
import React, { useEffect } from "react";
import NewPostScreen from "screens/NewPostScreen";

const CreatePostModal = ({ show, onHide }) => {
  useEffect(() => {
    if (show) {
      document.getElementsByTagName('body')[0].classList.add('modal-open');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('modal-open');
    }
  }, [show]);

  return (
    <ModalContainer onClose={() => onHide()} show={show} title={"Post a photo"}>
      <NewPostScreen/>
    </ModalContainer>
  );
};

export default CreatePostModal;

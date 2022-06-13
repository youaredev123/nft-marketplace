import React, { useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

import { ImageSet } from "../../ImageSet";

export default ({ images, onClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images == null) {
    return null;
  }

  const formattedImages = images.map((image) => ({
    source: URL.createObjectURL(image),
  }));

  return (
    <>
      <ImageSet
        images={images}
        onClickIndex={(index) => {
          onClick();
          // setModalOpen(!modalOpen);
          // setIndex(index);
        }}
      />
      {/* <ModalGateway>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(!modalOpen)}>
            <Carousel currentIndex={index} views={formattedImages} />
          </Modal>
        )}
      </ModalGateway> */}
    </>
  );
};

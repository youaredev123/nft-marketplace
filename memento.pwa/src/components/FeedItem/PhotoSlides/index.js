import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-images";

const Container = styled.div`
  position: relative;
  border-radius: 4px;
`;

export default ({ images, onClick }) => {
  const [index, setIndex] = useState(0);

  const formattedImages = images.map((image) => ({
    source: URL.createObjectURL(image),
  }));

  const PhotoCarousel = (
    <Carousel
      views={formattedImages}
      currentIndex={index}
      trackProps={{
        onViewChange: (index) => setIndex(index),
      }}
    />
  );

  return (
    <>
      <Container onClick={() => onClick()}>{PhotoCarousel}</Container>
    </>
  );
};

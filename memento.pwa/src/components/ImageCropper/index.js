import React, { useState, useEffect, useContext } from "react";
import Cropper from "react-easy-crop";
import { ThemeContext } from "styled-components";
import CloseIcon from "components/CloseButtonCrop";
import FullImageIcon from "components/FullImageButton";
import {
  CloseIconContainer,
  FullImageIconContainer,
  TapButton
} from "./styles";
const ImageCropper = ({ imgUrl, onCropComplete, onClose, loading }) => {
  const themeContext = useContext(ThemeContext);

  const defaultCrop = { x: 0, y: 0 };
  const [crop, setCrop] = useState(defaultCrop);
  const [zoom, setZoom] = useState(0);
  const [squareLength, setSquareLength] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const elementRef = React.createRef();
  const [aspect, setAspect] = useState(1);
  const [originalAspect, setOriginalAspect] = useState(4 / 3);
  const [originalImageSizes, setOriginalImageSizes] = useState(null);
  const [defaultZoom, setDefaultZoom] = useState(1.5);

  useEffect(() => {
    setSquareLength(elementRef.current.offsetWidth);
  }, [elementRef]);

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    // show grid only when in square mode
    const showGrid = zoom !== 1;
    // use square aspect when in square mode
    const updatedAspect = zoom === 1 ? originalAspect : 1;
    setShowGrid(showGrid);
    setAspect(updatedAspect);
    onCropComplete(croppedArea, croppedAreaPixels);
  }

  function onMediaLoaded(originalImageSizes) {
    // reset crop when uploading new image
    setCrop(defaultCrop);
    setOriginalImageSizes(originalImageSizes);
    const defaultOriginalAspect = originalImageSizes.width / originalImageSizes.height;
    setOriginalAspect(defaultOriginalAspect);
    const defaultFixedZoomedInValue =
      Math.max(originalImageSizes.width, originalImageSizes.height) /
      Math.min(originalImageSizes.width, originalImageSizes.height);
    let entryZoom =
      squareLength /
      Math.min(originalImageSizes.width, originalImageSizes.height);
    entryZoom = entryZoom === 0 ? 1 : entryZoom;
    setZoom(entryZoom);
    setDefaultZoom(defaultFixedZoomedInValue);
    const updatedAspect = entryZoom === 1 ? defaultOriginalAspect : 1;
    setAspect(updatedAspect);
  }

  function onZoomChange(zoomParam) {
    const isZoomingIn = zoom > zoomParam;

    const fixedZoom = isZoomingIn ? 1 : defaultZoom;
    const isInAkwardZoom = zoomParam < defaultZoom && zoomParam > 1;
    const newZoomValue = isInAkwardZoom ? fixedZoom : zoomParam;
    setZoom(newZoomValue);
  }

  function handleFullImageClick() {
    const updatedZoom = zoom > 1 ? 1 : defaultZoom;
    const updatedAspect = zoom === 1 ? originalAspect : 1;

    setZoom(updatedZoom);
    setAspect(updatedAspect);
  }

  return (
    <>
      <div
        ref={elementRef}
        style={{ position: "relative", height: squareLength || 411, maxHeight: "70vh" }}
      >
        <TapButton onClick={onClose}>
          <CloseIconContainer>
            <CloseIcon width={22} height={22} />
          </CloseIconContainer>
        </TapButton>
        <Cropper
          aspect={aspect}
          crop={crop}
          // if not full screen set cropSize
          cropSize={
            aspect === 1
              ? // in square mode adjust to the width of viewport
              { width: squareLength, height: squareLength }
              : {
                width: originalImageSizes.width,
                height: originalImageSizes.height
              }
          }
          image={imgUrl}
          onMediaLoaded={onMediaLoaded}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={onZoomChange}
          showGrid={showGrid && !loading}
          maxZoom={5}
          style={{
            cropAreaStyle: {
              color: "rgba(11,11,11,0.9)",
              border: "none",
              boxShadow: "none",
              transition: "all 0.4s"
            },
            containerStyle: {
              backgroundColor: themeContext ? themeContext.bgc : 'inherit',
            },
            mediaStyle: {
              transition:
                zoom === 1 || zoom === defaultZoom ? "all 0.4s" : "none"
            }
          }}
          zoomSpeed={5}
          zoom={zoom}
        />
        <TapButton onClick={handleFullImageClick}>
          <FullImageIconContainer>
            <FullImageIcon />
          </FullImageIconContainer>
        </TapButton>
      </div>
    </>
  );
};

export default ImageCropper;

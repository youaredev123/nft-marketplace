import React from "react";

import FirstPostContainerDesktop from "./FirstPostContainerDesktop";
import { DesktopWrapper } from "styles/layout";
import { withMemo } from "hoc/withMemo";

const FirstPostScreenDesktop = (
  {
    croppedImage,
    error,
    handleSubmit,
    imageCropLoading,
    onCropComplete,
    onClose,
    text,
    uploadPicture,
    urlPhoto,
    isInCroppingState,
    picturePath,
    ratio,
    setPostText,
    onSubmitClick,
    loading,
    history,
    fileInput
  }) => {
  return (
    <DesktopWrapper>
      <FirstPostContainerDesktop
        croppedImage={croppedImage}
        error={error}
        text={text}
        onClose={onClose}
        handleSubmit={handleSubmit}
        imageCropLoading={imageCropLoading}
        onCropComplete={onCropComplete}
        uploadPicture={uploadPicture}
        urlPhoto={urlPhoto}
        isInCroppingState={isInCroppingState}
        picturePath={picturePath}
        ratio={ratio}
        setPostText={setPostText}
        onSubmitClick={onSubmitClick}
        loading={loading}
        history={history}
        fileInput={fileInput}
      />
    </DesktopWrapper>
  );
};

export default withMemo(FirstPostScreenDesktop);

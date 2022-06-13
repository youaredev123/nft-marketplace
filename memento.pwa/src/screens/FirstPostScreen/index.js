import React, { useCallback, useEffect, useState } from "react";

import FirstPostScreenMobile from "./Mobile";
import { useImageCrop } from "hooks/useImageCrop";
import { useHistory } from "react-router-dom";
import axios from "axios";
import md5 from "md5.js";
import useWindowDimensions from "hooks/useWindowWidth";
import BlockChainService from "services/BlockChainService";
import FirstPostScreenDesktop from "screens/FirstPostScreen/Desktop";

const FirstPostScreen = ({ onSave }) => {
  const {
    croppedImage,
    error: imageCropError,
    handleSubmit,
    loading: imageCropLoading,
    setLoading: setImageCropLoading,
    onCropComplete,
    onClose,
    text,
    uploadPicture,
    urlPhoto,
    pictureData,
    ratio: imageCropperRatio,
    setUrlPhoto,
    setText,
    fileInput
  } = useImageCrop();

  const history = useHistory();
  const { windowWidth } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [picturePath, setPicturePath] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [isInCroppingState, setIsInCroppingState] = useState(urlPhoto !== "" && !picturePath);
  const [error, setError] = useState();

  useEffect(() => {
    setIsInCroppingState(urlPhoto !== "" && !picturePath);
  }, [urlPhoto, picturePath]);

  useEffect(() => {
    if (!picturePath) {
      setUrlPhoto("");
      setImageCropLoading(false);
    }
  }, [picturePath, setImageCropLoading]);

  useEffect(() => {
    if (imageCropError) {
      setError(imageCropError);
    }
  }, [imageCropError]);

  useEffect(() => {
    if (pictureData && pictureData.pictureId) {
      (async () => {
        const response = await axios.get(
          pictureData.picture,
          { responseType: 'arraybuffer' }
        );
        // const hash = new md5()
        //   .update(Buffer.from(response.data, "binary"))
        //   .digest("hex");
        setRatio(imageCropperRatio);
        setPicturePath(pictureData.picture);
      })();
    }
  }, [pictureData, history, imageCropperRatio]);

  const onSubmitPostClickHandler = useCallback(async () => {
    const comment = text;
    if (pictureData) {
      setLoading(true);
      const { pictureId, picture, blurredPictureUrl } = pictureData;
      const data = {
        pictureId,
        picture,
        blurredPictureUrl
      };

      if (comment && comment.length > 0) {
        try {
          data.comment = btoa(unescape(encodeURIComponent(text)));
        } catch (error) {
          console.error(error);
        }
        const tags = comment.match(/#[0-9a-zA-Z]+/gi);
        data.hashtags =
          tags && tags.length ? tags.map((item) => item.replace("#", "")) : [];
        const userTags = comment.match(/@[0-9a-zA-Z]+/gi);
        data.userTags =
          userTags && userTags.length
            ? userTags.map((item) => item.replace("@", ""))
            : [];
      }

      const response = await BlockChainService.firstPicture(data);
      setLoading(false);
      if (response.status === 200) {
        setError(null);
        history.push("/");
      } else {
        setError(response.message || "Error on posting first-post");
      }
    }
  }, [text, history, pictureData, setLoading]);

  const setPostText = (value) => {
    // this is to calculate the bytes , the size cannot exceed 512 on the backend
    const encodedTextLength = new TextEncoder().encode(value).length;

    const isTooLong = encodedTextLength > 200 || value.length > 150;
    if (isTooLong) {
      setError("postIsTooLong");
    }
    if (!isTooLong && value.length < 151) {
      if (error) {
        setError(null);
      }
      setText(value);
    }
  };

  return (
    <>
      {windowWidth <= 480 && (
        <FirstPostScreenMobile
          onSave={onSave}
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
          onSubmitClick={onSubmitPostClickHandler}
          loading={loading}
          fileInput={fileInput}
        />
      )}
      {windowWidth > 480 && (
        <FirstPostScreenDesktop
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
          onSubmitClick={onSubmitPostClickHandler}
          loading={loading}
          history={history}
          fileInput={fileInput}
        />
      )}
    </>
  );
};

export default FirstPostScreen;

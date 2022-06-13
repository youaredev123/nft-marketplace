import axios from "axios";
import { createRef, useRef, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import getCroppedImg from "../components/ImageCropper/cropImage";
import ContentService from "../services/ContentService";
import { isPwa } from "../components/AuthLayout";
export const useImageCrop = () => {
  const [urlPhoto, setUrlPhoto] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [ratio, setRatio] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [imageType, setImageType] = useState(null);
  const [error, setError] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const fileInput = useRef();
  const [originalFile, setOriginalFile] = useState(null);

  const handleSubmit = useCallback(async () => {
    if (croppedImage !== null) {
      setCroppedImage(null);
    }
    const file = fileInput.current.files[0];
    setOriginalFile(file);
    if (file && file.type.startsWith("image")) {
      setImageType(file.type);
      const imageBlobUrl = URL.createObjectURL(file);
      setUrlPhoto(imageBlobUrl);
    }
  });
  
  const onCropComplete = (croppedArea, croppedAreaPixels) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const onClose = () => setUrlPhoto("");

  const uploadPicture = useCallback(async () => {
    setLoading(true);
    setError(false);
    const { ratio: calculatedRatio, croppedImgBlob: croppedImage } =
      await getCroppedImg(urlPhoto, croppedAreaPixels);
    setRatio(calculatedRatio);
    if (croppedImage) {
      const pictureId = uuid();
      const croppedImageBlob = await fetch(croppedImage).then((r) => r.blob());
      const fileName = `${pictureId}.${imageType.split("/")[1]}`;
      const file = new File([croppedImageBlob], fileName, { type: imageType });
      const signedUrlResponse = await ContentService.getUrl(
        fileName,
        imageType
      );
      if (signedUrlResponse.hasError) {
        setLoading(false);
        setError(true);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const { url } = signedUrlResponse.data;
      const instance = axios.create({
        headers: { "Cache-Control": "no-cache" },
      });
      instance
        .put(url, file, {
          headers: {
            "Content-Type": imageType,
          },
        })
        .then((res) => {
          console.info("Successfully uploaded to s3", res);
          const pictureData = {
            pictureId,
            picture: `${process.env.REACT_APP_IMGIX_URL}/${fileName}`,
            blurredPictureUrl: `${process.env.REACT_APP_IMGIX_URL}/${fileName}?blur=1000`
          };
          setPictureData(pictureData);
        })
        .catch((err) => {
          console.error("Error uploading to s3", err);
          setLoading(false);
          setError(true);
        });
    }
  });

  const uploadOriginalPicture = useCallback(async () => {
    setLoading(true);
    setError(false);

    const fileRef = fileInput.current.files[0];
    const imageBlobUrl = URL.createObjectURL(fileRef);
    setUrlPhoto(imageBlobUrl);
    
    const pictureId = uuid();
    const imageBlob = await fetch(imageBlobUrl).then((r) => r.blob());
    const fileName = `${pictureId}.${fileRef.type.split("/")[1]}`;
    const file = new File([imageBlob], fileName, { type: fileRef.type });
    const signedUrlResponse = await ContentService.getUrl(
      fileName,
      fileRef.type
    );

    if (signedUrlResponse.hasError) {
      setLoading(false);
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const { url } = signedUrlResponse.data;
    const instance = axios.create({
      headers: { "Cache-Control": "no-cache" },
    });
    instance
      .put(url, file, {
        headers: {
          "Content-Type": imageType,
        },
      })
      .then((res) => {
        console.info("Successfully uploaded to s3", res);
        const pictureData = {
          pictureId,
          picture: `${process.env.REACT_APP_IMGIX_URL}/${fileName}`
        };
        setPictureData(pictureData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error uploading to s3", err);
        setLoading(false);
        setError(true);
      });
  });
  
  return {
    croppedImage,
    error,
    fileInput,
    handleSubmit,
    loading,
    onCropComplete,
    onClose,
    setCroppedImage,
    setUrlPhoto,
    setText,
    setLoading,
    setError,
    text,
    uploadPicture,
    uploadOriginalPicture,
    urlPhoto,
    pictureData,
    ratio,
    originalFile,
  };
};

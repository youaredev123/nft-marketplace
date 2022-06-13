import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorNotification, PostButton, InputContainer } from "./styles";
import ImageCropper from "../../components/ImageCropper";
import useCurrentUser from "../../hooks/useCurrentUser";
import { usePayments } from "hooks/usePayments";
import NewPostText from "./NewPostText";
import FileUploader from "./FileUploader";
import { useImageCrop } from "hooks/useImageCrop";
import Spinner from "../../components/Loader";
import {
  ImageContainer,
  ImageContainerInnerWrapper,
  ImageContainerWrapper,
  PageContainer,
  SidesMarginContainer
} from "../RelicsScreen/styles";
import axios from "axios";
import md5 from "md5.js";
import queryString from "query-string";
import Input from "components/Form/Input";
import NftService from "services/NftService";
import WideToast from "components/Toasts/WideToast";
import ErrorToast from "components/Toasts/ErrorToast";
import useToast from "hooks/useToast";

const NewPostScreen = () => {
  const {
    croppedImage,
    error,
    setError,
    fileInput,
    handleSubmit,
    setLoading: setImageCropLoading,
    loading: imageCropLoading,
    onCropComplete,
    onClose,
    setText,
    text,
    uploadPicture,
    setUrlPhoto,
    urlPhoto,
    pictureData,
    ratio: imageCropperRatio,
    originalFile
  } = useImageCrop();
  const {
    pay,
  } = usePayments();
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const { showToast } = useToast();
  const [paymentError, setPaymentError] = useState(false);
  const [noFundsError, setNoFundsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picturePath, setPicturePath] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [isInCroppingState, setIsInCroppingState] = useState(urlPhoto !== "" && !picturePath);
  const { isNFT } = (queryString.parse(window.location.search, { parseBooleans: true }));
  const [ numberOfEditions, setNumberOfEditions ] = useState(0);
  const [ nftTitle, setNFTTitle ] = useState(null);
  const [ note, setNote ] = useState(null);

  useEffect(() => {
    setIsInCroppingState(urlPhoto !== "" && !picturePath);
  }, [urlPhoto, picturePath]);

  useEffect(() => {
    setIsInCroppingState(urlPhoto !== "" && !picturePath);
  }, [urlPhoto, picturePath]);

  useEffect(() => {
    if (!picturePath) {
      setUrlPhoto("");
      setImageCropLoading(false);
    }
  }, [picturePath]);

  useEffect(() => {
    if (pictureData && pictureData.pictureId) {
      (async () => {
        const response = await axios.get(
          pictureData.picture,
          { responseType: 'arraybuffer' }
        );
        const hash = new md5()
          .update(Buffer.from(response.data, "binary"))
          .digest("hex");
        setRatio(imageCropperRatio);
        setPicturePath(pictureData.picture);
      })();
    }
  }, [pictureData, history, imageCropperRatio]);

  const onSubmitClick = useCallback(() => {
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

      pay({
        type: "PICTURE",
        data,
        onPayment: () => {
          setLoading(false);
          window.location.href = "/" + encodeURIComponent(currentUser.username);
        },
        onError: errorData => {
          setLoading(false);
          if (errorData === "no balance") {
            setNoFundsError(true);
          } else {
            setPaymentError(true);
          }
        },
        onMoneyButtonModalHide: () => setLoading(false),
      });
    }
  }, [text, picturePath, pictureData, setLoading]);

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

  const onNumberOfEditionsChange = (value) => {
    setNumberOfEditions(value);
  };

  const onNFTTitleChange = (value) => {
    setNFTTitle(value);
  };

  const onNoteChange = (value) => {
    setNote(value);
  };

  const createNFTCollection = useCallback(async () => {
    const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
    if (!walletInfo) return history.push('/wallet/login');

    setLoading(true);
    let formData = new FormData();
    formData.append("image", originalFile);
    formData.append("name", nftTitle);
    formData.append("note", note);
    formData.append("supply", +numberOfEditions);
    
    const res = await NftService.bulkCreateNFT(formData, walletInfo.password);
    if (res && !res.hasError) {
      showToast(<WideToast text="NFTs are creating in background, it might take some time." />);
      // return history.push('/');
    } else {
      showToast(<ErrorToast text="Something went wrong." />);
    }
    setLoading(false);
  });

  let containerWidth = 1;
  let containerHeight = 1;
  let topMargin = 0;
  let leftMargin = 0;
  if (picturePath) {
    const ratioNumber = Number(ratio);
    if (isFinite(ratioNumber) && ratioNumber > 0) {
      if (ratioNumber > 1) {
        containerHeight = 1 / ratioNumber;
        topMargin = (1 - (1 / ratioNumber)) / 2;
      } else if (ratioNumber < 1) {
        containerWidth = ratioNumber;
        leftMargin = (1 - ratioNumber) / 2;
      }
    }
  }

  return (<>
    {!isInCroppingState
      ? <>
        <PageContainer>
          <SidesMarginContainer>
            <ImageContainerWrapper>
              <ImageContainerInnerWrapper
                style={{
                  top: topMargin * 100 + "%",
                  left: leftMargin * 100 + "%",
                  width: containerWidth * 100 + "%",
                  height: containerHeight * 100 + "%",
                }}>
                {picturePath
                  ? <ImageContainer src={picturePath} />
                  : <FileUploader onChange={handleSubmit} fileInput={fileInput} fullSize={true} />}
              </ImageContainerInnerWrapper>
            </ImageContainerWrapper>
          </SidesMarginContainer>

          <div className="p-3">
            {isNFT ? <InputContainer>
              <Input
                name="numberOfEditions"
                type="number"
                placeholder="Number of Editions"
                onChange={(val) => onNumberOfEditionsChange(val)}
              >
              </Input>
              <Input
                name="title"
                type="text"
                placeholder="Title"
                onChange={(val) => onNFTTitleChange(val)}
              >
              </Input>
              <Input
                name="note"
                type="text"
                placeholder="Say something about this post"
                onChange={(val) => onNoteChange(val)}
              >
              </Input>
            </InputContainer>
              : <NewPostText error={error} text={text} setText={setPostText} />}
            <PostButton
              style={{ boxShadow: "none", marginTop: "70px", minWidth: "343px" }}
              className="primary"
              disabled={loading || text.length > 200 || !urlPhoto}
              onClick={ isNFT ? createNFTCollection : onSubmitClick}
            >
              {
                loading ? <Spinner color="white" size={16} /> :
                  isNFT ? "Mint NFT" : noFundsError ? "Insufficient funds" : "Post 1c"
              }
            </PostButton>
          </div>
          {((error && error !== "postIsTooLong") || paymentError) && (
            <ErrorNotification>
              There has been an error while uploading your image. Try again
            </ErrorNotification>
          )}
        </PageContainer>
      </>
      : <>
        <PageContainer style={{ marginBottom: "0", marginTop: "0" }}>
          <ImageCropper
            croppedImage={croppedImage}
            imgUrl={urlPhoto}
            onClose={onClose}
            onCropComplete={onCropComplete}
            loading={loading}
          />
          <PostButton
            className="primary"
            onClick={uploadPicture}
            disabled={loading}
            style={{
              margin: "30px auto 0 auto",
              boxShadow: "none",
              width: "calc(100% - 40px)"
            }}
          >
            {
              imageCropLoading ? <Spinner color="white"/> :
                error ? "Error occurred, try again" : "OK"
            }
          </PostButton>
        </PageContainer>
      </>}
  </>);
};

export default NewPostScreen;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import bsv from "bsv";
import queryString from "query-string";
import axios from "axios";
import md5 from "md5.js";
import Header from "components/Header";
import Slider from "screens/ExclusivityScreen/Slider";
import TextArea from "components/Form/TextArea";
import ImageCropper from "components/ImageCropper";
import Spinner from "components/Loader";
import RelicService from "services/RelicService";
import { useImageCrop } from "hooks/useImageCrop";
import { getAllCountries } from "hooks/useMapbox";
import { usePayments } from "hooks/usePayments";
import FileUploader from "../NewPostScreen/FileUploader";
import { useAccount } from "hooks/useAccount";
import useToast from "hooks/useToast";
import WideToast from "components/Toasts/WideToast";

import {
  ImageContainer,
  ImageContainerInnerWrapper,
  ImageContainerWrapper,
  MoneyContainer,
  PageContainer,
  PostButton,
  SelectValue,
  SidesMarginContainer,
  SidesMarginSplitter,
  SliderContainerWrapper,
  NoteText
} from "./styles";
import { DarkModeContext } from "hooks/useDarkMode";

const hashPuzzleScriptAsmPostfix = " OP_1 OP_PICK OP_SHA256 OP_1 OP_PICK OP_EQUAL OP_NIP OP_NIP";

const RelicCreatePhotoScreen = (
  {
    getFromQuery = true,
    hideHeader = false,
    classes = '',
    inputX = null,
    inputY = null,
    inputPicturePath = null,
    inputHash = null,
    inputRatio = null,
    onPaySuccessCallback = undefined,
    onBeforePayCallback = undefined
  }
) => {
   // maximum amount of $ inside the slider
   const max = 10;
   // maximum amount of $ inside the input
   const inputMax = 100;
   // minimum amount of $ per all components (slider / input)
   const min = 0.02;
   // change step when user is focused on the input and uses up/down arrows
   const step = 0.05;

  const history = useHistory();
  const location = useLocation();

  const { pay } = usePayments();

  const [relicValue, setRelicValue] = useState(0.02);
  const [sliderValue, setSliderValue] = useState((relicValue / max) * 105);
  const [relicValueCurrency, setRelicValueCurrency] = useState("USD");
  const [showHint, setShowHint] = useState(false);
  const [note, setNote] = useState("");
  const [incorrectMoney, setIncorrectMoney] = useState(false);
  const [notEnoughMoney, setNotEnoughMoney] = useState(false);
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState(inputX);
  const [y, setY] = useState(inputY);
  const [hash, setHash] = useState(inputHash);
  const [picturePath, setPicturePath] = useState(inputPicturePath);
  const [pictureRatio, setPictureRatio] = useState(inputRatio);
  const [isCropping, setCropping] = useState(false);
  const [countries, setCountries] = useState([]);
  const { account, setAccount } = useAccount();
  const { showToast } = useToast();
  const theme = useContext(DarkModeContext)

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const countries = getAllCountries();
      setCountries(countries);
    }

    return () => (isMounted = false);
  }, [getAllCountries]);

  useEffect(() => {
    if (getFromQuery) {
      console.log(location.search);
      const {
        x: xProvided,
        y: yProvided,
        path: picturePathProvided,
        hash: hashProvided,
        ratio: ratioProvided,
      } = queryString.parse(location.search);

      setX(Number(xProvided));
      setY(Number(yProvided));
      setHash(hashProvided);
      setPicturePath(picturePathProvided);
      setPictureRatio(Number(ratioProvided));
    }
  }, []);

  const {
    croppedImage,
    error,
    handleSubmit,
    loading: imageCropLoading,
    onCropComplete,
    onClose,
    uploadPicture,
    urlPhoto,
    pictureData,
    ratio: imageCropperRatio,
    fileInput
  } = useImageCrop();

  useEffect(() => {
    if (picturePath) {
      setShowHint(false);
    }
  }, [picturePath]);

  useEffect(() => {
    if (pictureData && pictureData.pictureId) {
      (async () => {
        const response = await axios.get(
          pictureData.picture,
          { responseType: 'arraybuffer' }
        );
        const _hash = new md5()
          .update(Buffer.from(response.data, "binary"))
          .digest("hex");

        setPicturePath(pictureData.picture);
        setHash(_hash);
        setPictureRatio(imageCropperRatio);

        if (getFromQuery) {
          const query = queryString.stringify({
            id: pictureData.pictureId,
            path: pictureData.picture,
            x,
            y,
            hash: _hash,
            ratio: imageCropperRatio
          });
          history.replace(`/relics/create?${query}`);
        }

        setCropping(false);
      })();
    }
  }, [pictureData, history, x, y, imageCropperRatio, getFromQuery]);


  const handlePriceChange = (val) => {
    setSliderValue(val);
    if (val === 0 || val === 1) {
      setRelicValue(min);
    } else if (val === 2) {
      setRelicValue(0.02);
    } else if (val === 3) {
      setRelicValue(0.03);
    } else if (val === 4) {
      setRelicValue(0.04);
    } else if (val === 5) {
      setRelicValue(0.05);
    } else {
      const decreasedVal = val - 4;
      const priceNotRounded = (max * decreasedVal) / 100 - max / 100;
      const priceRounded = Math.round(priceNotRounded * 100) / 100;
      setRelicValue(priceRounded);
    }
  };

  const handleInputChange = (value) => {
    if (value > inputMax) {
      value = inputMax;
    }

    if (value && value >= min) {
      setSliderValue((value / max) * 105);
    }

    setRelicValue(value);
  };

  const handleInputBlur = () => {
    let value = relicValue;

    if (!value || value < min) {
      value = min;
    }

    if (value > inputMax) {
      value = inputMax;
    }

    setRelicValue(value);
    setSliderValue((value / max) * 105);
  };

  const onSubmitClick = useCallback(() => {
    if (loading) {
      return;
    }
    if (!picturePath) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    const numRelicValue = Number(relicValue);
    if (!(numRelicValue > 0)) {
      setIncorrectMoney(true);
      return;
    }
    setIncorrectMoney(false);
    if (relicValueCurrency === "USD" && numRelicValue < 0.01 - Number.EPSILON) {
      setNotEnoughMoney(true);
      return;
    }
    setNotEnoughMoney(false);

    (async () => {
      setLoading(true);

      const pathHasQuery = picturePath.split("/").pop().indexOf("?") !== -1;
      const blurredPath = picturePath + (pathHasQuery ? "&" : "?") +
        "blur=1000";

      const response = await RelicService.prepareRelic({
        lon: x,
        lat: y,
        countryCode: account.currentCountry,
        note: btoa(unescape(encodeURIComponent(note))),
        amountUsd: relicValue.toString(),
        pictureUrl: picturePath,
        blurredPictureUrl: blurredPath,
      });

      if (response.status !== 200) {
        showToast(<WideToast text={response.message}/>)
        setLoading(false);
      } else {

        const newUuidHashBuffer = bsv.crypto.Hash.sha256(Buffer.from(response.data.secret));
        const hashPuzzleScriptOpcodes = newUuidHashBuffer.toString("hex") + hashPuzzleScriptAsmPostfix;

        // const satoshiAmount = {};
        pay({
          type: "RELIC",
          customOutputs: [
            {
              script: hashPuzzleScriptOpcodes,
              amount: response.data.scriptAmount,
              currency: "USD",
            }, {
              script: "OP_FALSE OP_RETURN 52656c696361 " + hash,
              amount: "0",
              currency: "USD",
            }, {
              to: response.data.relicaPaymail,
              amount: response.data.relicaPaymentAmount,
              currency: "USD",
            }
          ],
          buttonData: response.data.buttonData,
          // satoshiAmountOut: satoshiAmount,
          onPayment: async (txId) => {
            if (typeof onBeforePayCallback !== "undefined") {
              onBeforePayCallback();
            }

            const txIdResponse = await RelicService.addTxId({
              txId,
              relicId: response.data.relicId
            });

            setLoading(false);
            let msg;

            if (txIdResponse.status !== 200) {
              msg = "Unable to add txId for Relic. Result from backend: " +
                txIdResponse.status + " " + JSON.stringify(txIdResponse.data);
            } else {
              msg = "Created relic successfully!";
            }

            if (typeof onPaySuccessCallback !== "undefined") {
              onPaySuccessCallback(msg);
            } else {
              history.push("/relics?success=1");
            }
          },
          onError: errorCode => {
            setLoading(false);
            alert("Couldn't create a transaction: \"" + errorCode + "\"");
          },
          onMoneyButtonModalHide: () => {
            setLoading(false);
          }
        });
      }
    })();
  }, [relicValue, relicValueCurrency, x, y, note, picturePath, history,
    setLoading, setShowHint, setIncorrectMoney, setNotEnoughMoney, hash]);

  const renderHeader = useCallback(() => {
    return !hideHeader ? <Header title="Create Relic" hasBack/> : null;
  }, [hideHeader]);


  useEffect(() => {
    setCropping(urlPhoto !== "" && !picturePath)
  }, [urlPhoto, picturePath]);

  if (!isFinite(x) || !isFinite(y)) {
    return <Redirect to="/relics"/>;
  }

  let containerWidth = 1;
  let containerHeight = 1;
  let topMargin = 0;
  let leftMargin = 0;
  if (picturePath) {
    const ratioNumber = Number(pictureRatio);
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

  const overflowType = topMargin === 0 && leftMargin === 0 && containerWidth === 1 && containerHeight === 1 ? "hidden" : 'inherit';

  return (
    <>
      {renderHeader()}
      <PageContainer className={`relic-create-photo-container ${classes}`}>
        {!isCropping
          ? <>
            <SidesMarginContainer className={"relic-create-photo-wrapper"}>
              <TextArea
                name="relic-note"
                className="relic-note-input"
                onChange={setNote}
                placeholder="Say something about this post"
                value={note}
                maxLength={310}
                style={{ background: theme.darkMode ? 'none' : 'inherit' }}
              />
              <ImageContainerWrapper className={"relic-create-photo-image-wrapper"}>
                <ImageContainerInnerWrapper
                  style={{
                    top: topMargin * 100 + "%",
                    left: leftMargin * 100 + "%",
                    width: containerWidth * 100 + "%",
                    height: containerHeight * 100 + "%",
                    // overflow: overflowType
                  }}>
                  {picturePath
                    ? <ImageContainer src={picturePath}/>
                    : <FileUploader onChange={handleSubmit} fileInput={fileInput} fullSize={true}/>}
                </ImageContainerInnerWrapper>
              </ImageContainerWrapper>
              <SliderContainerWrapper>
                <Slider
                  pricePerLike={relicValue}
                  onChange={handlePriceChange}
                  sliderValue={sliderValue}
                  onInputChange={handleInputChange}
                  onInputBlur={handleInputBlur}
                  step={step}
                  label="Attach Bitcoin"
                  max={105}
                />
              </SliderContainerWrapper>
              
            </SidesMarginContainer>
            <SidesMarginSplitter/>
            <SidesMarginContainer
              className="relic-create-photo-button-wrapper"
              style={{
                position: "relative",
                top: "20px",
                width: "calc(100% - 40px)"
              }}
            >
              <PostButton
                className="primary relic-create-photo-button"
                onClick={onSubmitClick}
                style={{ marginBottom: "30px", boxShadow: "none" }}
              >
                {
                  loading ? <Spinner color="white"/> :
                    showHint ? "Add picture" :
                      incorrectMoney ? "Add funds" :
                        notEnoughMoney ? "Minimum amount is 1c" :
                          "Post"
                }
              </PostButton>
              <NoteText>
                <p>Currently only compatible with Money Button wallets.</p>
                <p>Relica charges 2% of Bitcoin attached with a 1¢ minimum</p>
              </NoteText>
            </SidesMarginContainer>
            <SidesMarginContainer
              className={"relic-side-margin-container"}
              style={{
                width: "calc(100% - 40px)",
                height: "86px",
              }}
            />
          </>
          : <>
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
                margin: "20px",
                width: "calc(100% - 40px)",
                boxShadow: "none"
              }}
            >
              {
                imageCropLoading ? <Spinner color="white"/> :
                  error ? "Error occured, try again" : "OK"
              }
            </PostButton>
          </>}
      </PageContainer>
    </>
  );
};

export default RelicCreatePhotoScreen;

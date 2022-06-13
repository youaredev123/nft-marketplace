import React, {useEffect, useState, useCallback, useContext} from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import bsv from "bsv";
import queryString from "query-string";
import axios from "axios";
import md5 from "md5.js";
import Header from "../../../components/Header";
import Input from "../../../components/Form/Input";
import TextArea from "../../../components/Form/TextArea";
import ImageCropper from "../../../components/ImageCropper";
import Spinner from "../../../components/Loader";
import RelicService from "../../../services/RelicService";
import { useImageCrop } from "../../../hooks/useImageCrop";
import { getAllCountries } from "../../../hooks/useMapbox";
import { usePayments } from "../../../hooks/usePayments";
import FileUploader from "../../NewPostScreen/FileUploader";
import { useAccount } from "hooks/useAccount";

import {
  ImageContainer,
  ImageContainerWrapper,
  ImageContainerInnerWrapper,
  PageContainer,
  PostButton,
  MoneyContainer,
  SidesMarginContainer,
  SidesMarginSplitter,
  SelectValue,
} from "./styles";
import {DarkModeContext} from "../../../hooks/useDarkMode";
import {MarketItemTitle} from "../Market/styles";
import useToast from "hooks/useToast";
import WideToast from "components/Toasts/WideToast";

const hashPuzzleScriptAsmPostfix = " OP_1 OP_PICK OP_SHA256 OP_1 OP_PICK OP_EQUAL OP_NIP OP_NIP";

export default () => {
  const history = useHistory();
  const location = useLocation();
  const {
    x: xProvided,
    y: yProvided,
    path: picturePath,
    hash,
    ratio,
  } = queryString.parse(location.search);

  const { pay } = usePayments();

  const [relicValue, setRelicValue] = useState("");
  const [relicValueCurrency, setRelicValueCurrency] = useState("USD");
  const [showHint, setShowHint] = useState(false);
  const [note, setNote] = useState("");
  const [incorrectMoney, setIncorrectMoney] = useState(false);
  const [notEnoughMoney, setNotEnoughMoney] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const { account, setAccount } = useAccount();
  const { showToast } = useToast();
  const theme = useContext(DarkModeContext);

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
  } = useImageCrop();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const countries = getAllCountries();
      setCountries(countries);
    }

    return () => (isMounted = false);
  }, [getAllCountries]);

  const x = Number(xProvided);
  const y = Number(yProvided);
  // if (!isFinite(x) || !isFinite(y)) {
  //   return <Redirect to="/relics" />;
  // }

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
        const hash = new md5()
          .update(Buffer.from(response.data, "binary"))
          .digest("hex");
        const query = queryString.stringify({
          id: pictureData.pictureId,
          path: pictureData.picture,
          x,
          y,
          hash,
          ratio: imageCropperRatio,
        });
        history.replace(`/relics/create?${query}`);
      })();
    }
  }, [pictureData, history, x, y, imageCropperRatio]);

  const onRelicValueChange = useCallback(value => {
    const regex = /^(?:0|[1-9]\d+|)?(?:.?\d{0,4})?$/;

    if (value === '' || regex.test(value)) {
      setRelicValue(value);
    }
  }, []);

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
        showToast(<WideToast text="Please update your country to drop a relic at this location!"/>)
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
            }
            // , {
            //   to: response.data.relicaPaymail,
            //   amount: response.data.relicaPaymentAmount,
            //   currency: "USD",
            // }
          ],
          buttonData: response.data.buttonData,
          // satoshiAmountOut: satoshiAmount,
          onPayment: async (txId) => {

            const txIdResponse = await RelicService.addTxId({
              txId,
              relicId: response.data.relicId
            });

            if (txIdResponse.status !== 200) {
              alert("Unable to add txId for Relic. Result from backend: " +
              txIdResponse.status + " " + JSON.stringify(txIdResponse.data));
              setLoading(false);
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
    setLoading, setShowHint, setIncorrectMoney, setNotEnoughMoney]);

  const isInCroppingState = urlPhoto !== "" && !picturePath;
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

  const overflowType = topMargin === 0 && leftMargin === 0 && containerWidth === 1 && containerHeight === 1  ? "hidden" : 'inherit';

  return (<>
    <Header title="NFT" hasBack />
    <PageContainer>
      {!isInCroppingState
        ? <>
          <SidesMarginContainer>
            <TextArea
              name="relic-note"
              onChange={setNote}
              placeholder="Say something about this post"
              value={note}
              maxLength={310}
              style={{background: theme.darkMode ? 'none' : 'inherit'}}
            />

            <ImageContainerWrapper>
              <ImageContainerInnerWrapper
                style={{
                  top: topMargin * 100 + "%",
                  left: leftMargin * 100 + "%",
                  width: containerWidth * 100 + "%",
                  height: containerHeight * 100 + "%",
                  overflow: overflowType
                }}>
                {picturePath
                  ? <ImageContainer src={picturePath} />
                  : <FileUploader onChange={handleSubmit} fullSize={true} />}
              </ImageContainerInnerWrapper>
            </ImageContainerWrapper>
            <MoneyContainer>
              <MarketItemTitle style={{textAlign: "left", padding: 0}}>
                <span>#2</span> of 2,000
              </MarketItemTitle>
              <Input
                name="relic-value"
                onChange={onRelicValueChange}
                placeholder="$ Add Funds"
                value={relicValue}
                style={{ maxWidth: "240px" }}
              >
                <SelectValue value={relicValueCurrency} onChange={e => setRelicValueCurrency(e.target.value)}
                             style={{background: theme.darkMode ? 'none' : 'inherit', color: theme.darkMode ? '#FAFAFA' : 'black'}}>
                  <option value="BSV">BSV</option>
                  <option value="USD">USD</option>
                </SelectValue>
              </Input>

              <Input
                name="title"
                placeholder="Title"
                style={{ maxWidth: "240px" }}
              >
              </Input>
              </MoneyContainer>
          </SidesMarginContainer>
          <SidesMarginSplitter/>
          <SidesMarginContainer
            style={{
              position: "relative",
              top: "20px",
              width: "calc(100% - 40px)"
            }}
          >
            <PostButton
              onClick={onSubmitClick}
              style={{ marginBottom: "30px", boxShadow: "none" }}
            >
              {
                loading ? <Spinner color="white" /> :
                  showHint ? "Add picture" :
                    incorrectMoney ? "Add funds" :
                      notEnoughMoney ? "Minimum amount is 1c" :
                        "Post"
              }
            </PostButton>
          </SidesMarginContainer>
          <SidesMarginContainer
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
              imageCropLoading ? <Spinner color="white" /> :
                error ? "Error occured, try again" : "OK"
            }
          </PostButton>
        </>}
    </PageContainer>
  </>);
};

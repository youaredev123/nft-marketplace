import React from 'react';
import {
  ActionContainer,
  Actions,
  FirstPostContainer,
  Info,
  InfoContainer,
  InfoLogo,
  InfoText,
  WelcomeText
} from "./styles";
import bg from "assets/images/AuthBackkground.png";
import bgBig from "assets/images/AuthBackkground@2.png";
import logo from "assets/images/marketing-logo.png";
import { FormContainer } from "../styles";
import {
  ImageContainer,
  ImageContainerInnerWrapper,
  ImageContainerWrapper,
  SidesMarginContainer
} from "../../RelicsScreen/styles";
import FileUploader from "screens/NewPostScreen/FileUploader";
import NewPostText from "screens/NewPostScreen/NewPostText";
import { BtnGroupEdit } from "screens/SettingsScreen/Desktop/Tab/styles";
import { ErrorNotification, PostButton } from "screens/NewPostScreen/styles";
import ImageCropper from "components/ImageCropper";
import Spinner from "components/Loader";

const FirstPostContainerDesktop = (
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
  }
) => {

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

  return (
    <>
      <InfoContainer>
        <img src={bg}
             srcSet={bg + ' 1x,' + bgBig + ' 2x'}
             alt=""/>
        <Info>
          <InfoLogo>
            <img src={logo} alt=""/>
          </InfoLogo>
          <InfoText>
            Post photos. Make money. Maintain ownership
          </InfoText>
        </Info>
      </InfoContainer>

      <ActionContainer>
        <Actions>
          <FirstPostContainer>
            <WelcomeText>Post a picture</WelcomeText>

            <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
              <p>
                Click here to upload your first photo for FREE!
              </p>
            </div>
          </FirstPostContainer>

          {!isInCroppingState
            ? <>
              <FormContainer style={{ height: "auto" }}>
                <SidesMarginContainer style={{ margin: "0 auto" }}>
                  <ImageContainerWrapper>
                    <ImageContainerInnerWrapper
                      style={{
                        top: topMargin * 100 + "%",
                        left: leftMargin * 100 + "%",
                        width: containerWidth * 100 + "%",
                        height: containerHeight * 100 + "%",
                      }}>
                      {picturePath
                        ? <ImageContainer src={picturePath}/>
                        : <FileUploader onChange={handleSubmit} fileInput={fileInput} fullSize={true}/>}
                    </ImageContainerInnerWrapper>
                  </ImageContainerWrapper>
                </SidesMarginContainer>

                <div className="p-3">
                  <NewPostText error={error} text={text} setText={setPostText}/>
                  <BtnGroupEdit style={{ marginTop: "50px", width: "100%" }}>
                    <PostButton
                      style={{
                        boxShadow: "none",
                        width: "40%",
                        marginLeft: "auto",
                        background: "white",
                        color: "black",
                        border: "1px solid black"
                      }}
                      className="primary"
                      onClick={() => history.push('/')}
                    >
                      Skip
                    </PostButton>
                    <PostButton
                      style={{ boxShadow: "none", width: "40%" }}
                      className="primary"
                      disabled={loading || text.length > 200 || !urlPhoto}
                      onClick={onSubmitClick}
                    >
                      {loading ? <Spinner color="white" size={20}/> : 'Post'}
                    </PostButton>
                  </BtnGroupEdit>
                </div>
                {error && error !== "postIsTooLong" && (
                  <ErrorNotification>
                    There has been an error while uploading your image. Try again
                  </ErrorNotification>
                )}
              </FormContainer>
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
                  boxShadow: "none",
                  width: "calc(100% - 40px)"
                }}
              >
                {
                  imageCropLoading ? <Spinner color="white"/> :
                    error ? "Error occurred, try again" : "OK"
                }
              </PostButton>
            </>}
        </Actions>
      </ActionContainer>
    </>
  );
};

export default FirstPostContainerDesktop;

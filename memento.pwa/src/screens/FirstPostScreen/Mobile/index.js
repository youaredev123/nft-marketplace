import React from "react";
import FirstPostBackground from "assets/images/first_post_bg.jpg";
import { FormContainer, ImgContainer, PageContainer } from "screens/FirstPostScreen/styles";
import { FirstPostContainer } from "screens/FirstPostScreen/Desktop/styles";
import {
  ImageContainer,
  ImageContainerInnerWrapper,
  ImageContainerWrapper,
  SidesMarginContainer
} from "screens/RelicsScreen/styles";
import { ErrorNotification, PostButton } from "screens/NewPostScreen/styles";
import FileUploader from "screens/NewPostScreen/FileUploader";
import NewPostText from "screens/NewPostScreen/NewPostText";
import { BtnGroupEdit, DiscardButton } from "screens/SettingsScreen/Desktop/Tab/styles";
import { Link } from "react-router-dom";
import ImageCropper from "components/ImageCropper";
import Spinner from "components/Loader";

const FirstPostScreenMobile = (
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
      {!isInCroppingState
        ? <>
          <FormContainer>
            <ImgContainer>
              <img src={FirstPostBackground} alt="First Post"/>
              <div>Post a picture</div>
            </ImgContainer>

            <FirstPostContainer>
              <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
                <p>
                  Click here to upload your first photo for FREE!
                </p>
              </div>
            </FirstPostContainer>

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
              <BtnGroupEdit style={{
                marginTop: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <DiscardButton style={{ width: "40%", marginLeft: "0", height: "50px" }}>
                  <Link to={`/`}>
                    Skip
                  </Link>
                </DiscardButton>
                <PostButton
                  style={{ boxShadow: "none", width: "40%" }}
                  className="primary"
                  disabled={loading || text.length > 200 || !urlPhoto}
                  onClick={onSubmitClick}
                >
                  Post
                </PostButton>
              </BtnGroupEdit>
            </div>
            {((error && error !== "postIsTooLong")) && (
              <ErrorNotification>
                There has been an error while uploading your image. Try again
              </ErrorNotification>
            )}
          </FormContainer>
        </>
        : <>
          <PageContainer>
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
          </PageContainer>
        </>}
    </>
  );
};

export default FirstPostScreenMobile;

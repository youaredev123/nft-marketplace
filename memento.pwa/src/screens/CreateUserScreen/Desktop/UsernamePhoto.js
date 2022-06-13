import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ActionContainer,
  Actions,
  Button,
  Buttons,
  Info,
  InfoContainer,
  InfoLogo,
  InfoText,
  LoginContainer,
  LoginText
} from "screens/SplashScreen/Desktop/styles";
import bg from "assets/images/AuthBackkground.png";
import bgBig from "assets/images/AuthBackkground@2.png";
import logo from "assets/images/marketing-logo.png";
import back from "assets/images/back.svg";
import Input from "components/Form/Input";
import {
  FileInput,
  FileInputText,
  FileInputTextDesc,
  FileInputTextMain,
  Label,
  LinkToTeemsOfService,
  ProfileAvatar
} from "../styles";
import {LinkToTeemsOfServiceWrapper, MyLabel} from "./styles";
import PlaceholderAvatar from "assets/images/Upload_photo_square.svg";
import checkUsername from "lib/checkUsername";
import Resizer from "react-image-file-resizer";
import { toBase64 } from "lib/imageHelpers";
import { useImageCrop } from "hooks/useImageCrop";
import { useAccount } from "hooks/useAccount";

const UsernamePhotoDesktop = ({ onSave }) => {
  const imageBlobUrlRef = useRef('');
  const { setAccount } = useAccount();
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rawImage, setRawImage] = useState("");
  const [photo, setPhoto] = useState(PlaceholderAvatar);
  const [loadingData, setLoading] = useState(false);
  const nameError = checkUsername(displayName);
  const [clickToButton, setClickToButton] = useState(false);
  const {
    urlPhoto,
    pictureData,
    fileInput,
    loading,
    uploadOriginalPicture,
  } = useImageCrop();

  const onCreate = useCallback(async () => {
    if (nameError === null) {
      setLoading(true);
        const response = await onSave(displayName, pictureData?.picture);
        if (response.status === 409) {
          setError("Username unavailable");
        }
        setLoading(false);
      
    } else if (nameError === "system") {
      setError("Username unavailable");
    }
  }, [displayName, setLoading, rawImage, setError, pictureData]);

  const handleSubmit = async () => {
    let file = fileInput.current.files[0];
    if (file && file.type.startsWith("image")) {
      const imageBlobUrl = URL.createObjectURL(file);
      imageBlobUrlRef.current = imageBlobUrl;
      setPhoto(imageBlobUrl)
        await uploadOriginalPicture();
    }
  };

  const onDisplayNameChange = (value) => {
    setError("");
    if ([null, "system", "short"].includes(checkUsername(value))) {
      setDisplayName(value);
    } else if (!value) {
      setDisplayName("");
    }
  };

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
          <LoginContainer>
            <img src={back} alt=""/>
            <LoginText>Username</LoginText>

            <Label htmlFor="coverPic">
              <FileInput
                type="file"
                name="coverPic"
                id="coverPic"
                ref={fileInput}
                onChange={_ => handleSubmit()}
                accept="image/*"
              />

              <ProfileAvatar url={photo} width={90} height={90}/>

              <FileInputText>
                <FileInputTextMain>Profile photo</FileInputTextMain>
                <FileInputTextDesc>Upload your profile photo here</FileInputTextDesc>
              </FileInputText>
            </Label>

            <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
              <div style={{ width: "100%", marginBottom: '40px', position: "relative" }}>
                <Input
                  disabled={!!loadingData}
                  onChange={(val) => onDisplayNameChange(val)}
                  placeholder="Username"
                  value={displayName}
                  inputClassName="text-left"
                />
              </div>
              {nameError === "short" && clickToButton ? (
                <MyLabel>
                  Username must be three characters or more
                </MyLabel>
              ) : (error && error.length) ? (
                <MyLabel htmlFor="displayName">
                  {error}
                </MyLabel>
              ) : null}
            </div>


            <Buttons >
              <Button 
              className={`blue ${!loading ? '' : 'disable'}`} onClick={() => {
                setClickToButton(true);
                return loadingData ? null : onCreate();
              }}>
                {(loadingData || loading) && (<i className={"fas fa-spinner fa-spin mr-4"}/>)}
                <span>Next</span>
              </Button>
            </Buttons>


            <LinkToTeemsOfServiceWrapper>
              <LinkToTeemsOfService>
                By signing up you agree to our{" "}
                <a href="/terms.html">Terms and Conditions</a>
              </LinkToTeemsOfService>
            </LinkToTeemsOfServiceWrapper>
          </LoginContainer>
        </Actions>

      </ActionContainer>
    </>
  );
};

export default UsernamePhotoDesktop;

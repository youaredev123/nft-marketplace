import React, { useState, createRef, useCallback } from "react";
import Resizer from "react-image-file-resizer";
import Banner_Create_User from "../../../assets/images/createUserHeader.png";
import PlaceholderAvatar from "../../../assets/images/Upload_photo_square.svg";
import Button from "../../../components/Button";
import Input from "../../../components/Form/Input";

import { toBase64 } from "../../../lib/imageHelpers";
import checkUsername from "../../../lib/checkUsername";
import { isPwa } from "../../../components/AuthLayout";
import {
  ProfileAvatar,
  FormContainer,
  FileInput,
  Label,
  FileInputText,
  FileInputTextMain,
  FileInputTextDesc,
  LinkToTeemsOfService,
  LinkToTeemsOfServiceWrapper,
  ImgContainer
  // FloatingButton,
  // Arrow
} from "../styles";

export default ({ onSave }) => {
  const fileInput = createRef();
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rawImage, setRawImage] = useState("");
  const [photo, setPhoto] = useState(PlaceholderAvatar);
  const [loading, setLoading] = useState(false);
  const nameError = checkUsername(displayName);
  const [clickToButton, setClickToButton] = useState(false);

  const onCreate = useCallback(async () => {
    if (nameError === null) {
      setLoading(true);
      // not using adult at the moment
      // const response = await onSave(displayName, rawImage, exclusivity, pricePerLike, adult);
      const response = await onSave(displayName, rawImage);
      if (response.status === 409) {
        setError("Username unavailable");
      }
      setLoading(false);
    } else if (nameError === "system") {
      setError("Username unavailable");
    }
  }, [displayName, setLoading, rawImage, setError]);

  const handleSubmit = async () => {
    let file = fileInput.current.files[0];
    if (file && file.type.startsWith("image")) {
      const initialSize = file.size;
      let quality = 100;

      if (initialSize > 100000) {
        quality = 99;
      }

      Resizer.imageFileResizer(
        file,
        400,
        400,
        "JPEG",
        quality,
        0,
        async (blob) => {
          const base64Image = await toBase64(blob);
          setRawImage(base64Image);
          setPhoto(`data:image/gif;base64,${base64Image}`);
        },
        "blob"
      );
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
    <FormContainer>
      <ImgContainer>
        {/* not using another screens */}
        {/* <FloatingButton onClick={onPrevious}>
          <Arrow />
        </FloatingButton> */}
        <img src={Banner_Create_User} alt="" />
      </ImgContainer>
      <Label htmlFor="coverPic">
        <FileInput
          type="file"
          name="coverPic"
          id="coverPic"
          ref={fileInput}
          onChange={() => handleSubmit()}
        />

        <ProfileAvatar url={photo} width={110} height={110} />
        <FileInputText>
          <FileInputTextMain>Profile photo</FileInputTextMain>
          <FileInputTextDesc>Upload your profile photo here</FileInputTextDesc>
        </FileInputText>
      </Label>

      <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
        <div style={{ width: "90%", marginTop: "50px" }} className="mb-4">
          <Input
            disabled={!!loading}
            onChange={(val) => onDisplayNameChange(val)}
            placeholder="Username"
            value={displayName}
            inputClassName="text-left"
          />
        </div>
        {nameError === "short" && clickToButton ? (
          <label style={{ color: "#10a5f5" }} className="mb-2">
            Username must be three characters or more
          </label>
        ) : error && error.length ? (
          <label htmlFor="displayName" style={{ color: "#10a5f5" }}>
            {error}
          </label>
        ) : null}
      </div>

      <Button
        className="primary"
        style={{
          padding: "17px",
          fontSize: "18px",
          width: "90%",
          margin: `0 auto ${
            window.mobileCheck() && !isPwa() ? "125px" : "75px"
          }`
        }}
        onClick={() => {
          setClickToButton(true);
          return loading ? null : onCreate();
        }}
      >
        {loading && (<i className={"fas fa-spinner fa-spin mr-4"}/>)}
        Create user
      </Button>
      <LinkToTeemsOfServiceWrapper>
        <LinkToTeemsOfService>
          By signing up you agree to our{" "}
          <a href="/terms.html">Terms and Conditions</a>
        </LinkToTeemsOfService>
      </LinkToTeemsOfServiceWrapper>
    </FormContainer>
  );
};

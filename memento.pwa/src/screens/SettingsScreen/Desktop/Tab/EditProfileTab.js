import { ReactComponent as EditIcon } from "assets/icons/i-edit.svg";
import { ReactComponent as EditIconBlue } from "assets/icons/i-edit-blue.svg";
import Input from "components/Form/Input";
import TextArea from "components/Form/TextArea";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useMyProfile from "hooks/useMyProfile";
import checkUsername from "lib/checkUsername";

import {
  BtnGroupEdit,
  DiscardButton,
  EditProfileCircle,
  EditProfileInputWrapper,
  FileInput,
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileContainer,
  ProfileTile,
  ProfileUserName,
  SubmitButton
} from "./styles";
import CoverImage from "components/CoverImage";
import _, { result } from "lodash";
import { useImageCrop } from "hooks/useImageCrop";
import { useAccount } from "hooks/useAccount";
import useCurrentUser from "hooks/useCurrentUser";

const EditProfileTab = () => {
  const {
    profile = {},
    updateBannerImage,
    updateBioAndUsername,
    updateProfileImage,
  } = useMyProfile();
  const { fetchCurrentUser } = useCurrentUser();

  const {
    urlPhoto,
    pictureData,
    fileInput,
    uploadOriginalPicture,
  } = useImageCrop();

  const { setAccount, account  } = useAccount();

  const [img, setImg] = useState('');
  const imageBlobUrlRef = useRef('');
  const [isEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(account.profilePic);
  const [displayName, setDisplayName] = useState(account.username || "");
  const [bioText, setBioText] = useState(account.bio || "");
  const [saving, setSaving] = useState(false);

  const nameError = checkUsername(displayName);
  
  useEffect(()=> {
    fetchCurrentUser();
  }, [])

  useEffect(() => {
    if (pictureData && pictureData.picture) {
      setPhoto(urlPhoto);
      updateProfileImage(pictureData.picture).then((result) => {
        setAccount(result);
        return;
      });
    }
  }, [pictureData]);

  const handleSubmit = async () => {
    let file = fileInput.current.files[0];
    if (file && file.type.startsWith("image")) {
      const imageBlobUrl = URL.createObjectURL(file);
      imageBlobUrlRef.current = imageBlobUrl;
      setPhoto(imageBlobUrl)
    }
  };

  const onUpdate = useCallback(async () => {
    if (bioText.length <= 350) {
      if (nameError === null) {
        setSaving(true);
        let base64BioText = '';
        if (bioText && bioText.length) {
          base64BioText = btoa(unescape(encodeURIComponent(bioText)));
        }

        if (imageBlobUrlRef.current.length > 0) {
          await uploadOriginalPicture();
        }

        if(displayName !== account.username || bioText !== account.bio ) {
          const user = await updateBioAndUsername(displayName, base64BioText);

          if (user && user.id) {
            setEdit(false);
            fetchCurrentUser();
            if (error) {
              setError(null);
            }
          } else {
            setError("Username unavailable");
            // show error for duplicate name
          }
        }

        setSaving(false);
      } else if (nameError === "system") {
        setError("Username unavailable");
      }
    }
  }, [displayName, nameError, bioText, setError, img]);

  const onDisplayNameChange = (value) => {
    if (error) {
      setError("")
    }
    
    if ([null, "system", "short"].includes(checkUsername(value))) {
      setDisplayName(value);
    } else if (!value) {
      setDisplayName("");
    }
  };

  const onBioChange = (value) => {
    // value.match(/^[a-z\d\-_\s]+$/i) != null
    if (value && value.length <= 350) {
      setBioText(value);
    } else if (!value) {
      setBioText("");
    }
  };

  const displayProfileContainer = useCallback(() => {
    if (_.isEmpty(profile)) {
      return null;
    }

    return (
      <ProfileContainer>
        <CoverImage
          url={profile.bannerPic}
          canEdit
          onSave={updateBannerImage}
          Icon={EditIcon}
        />
      </ProfileContainer>
    );
  }, [profile, updateBannerImage]);

  return (
    <>
      <h3>Edit Profile</h3>
      {displayProfileContainer()}
      <ProfileTile>
        <ProfileAvatarContainer>
          <ProfileAvatar width={120} height={120} url={photo} style={{ border: 0 }}>
            <EditProfileCircle>
              <FileInput
                type="file"
                name="coverPic"
                id="coverPic"
                ref={fileInput}
                className="mt-5"
                onChange={handleSubmit}
                accept="image/*"
              />
              <label htmlFor="coverPic">
                <EditIconBlue/>
              </label>
            </EditProfileCircle>
          </ProfileAvatar>
        </ProfileAvatarContainer>

        <ProfileUserName>{profile.username}</ProfileUserName>

        <EditProfileInputWrapper>
          <label style={{ color: "#939393", float: 'left', fontWeight: 400, fontSize: '12px' }}>Display Name</label>
          <Input
            name="displayName"
            onChange={(val) => onDisplayNameChange(val)}
            placeholder="User name"
            value={displayName}
          />

          {nameError === "short" ? (
            <label style={{ color: "#10a5f5" }}>
              Username must be three characters or more
            </label>
          ) : (error && error.length) ? (
            <label style={{ color: "#10a5f5" }}>{error}</label>
          ) : null}
          
        </EditProfileInputWrapper>
        <EditProfileInputWrapper>
          <label style={{ color: "#939393", float: 'left', fontWeight: 400, fontSize: '12px' }}>Bio</label>
          <TextArea
            style={{ background: 'none' }}
            name="bio"
            onChange={(val) => onBioChange(val)}
            placeholder="Bio"
            value={bioText}
          />
        </EditProfileInputWrapper>

        <BtnGroupEdit>
          <DiscardButton>
            <Link to={`/${profile.username || ''}`}>
              Discard changes
            </Link>
          </DiscardButton>
          <SubmitButton
            href="#"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onUpdate();
            }}
            style={{
              marginRight: 0
            }}
          >
            {saving && (<i className={"fas fa-spinner fa-spin mr-4"}/>)}
            Save changes
          </SubmitButton>
        </BtnGroupEdit>
      </ProfileTile>
    </>
  );
};

export default EditProfileTab;

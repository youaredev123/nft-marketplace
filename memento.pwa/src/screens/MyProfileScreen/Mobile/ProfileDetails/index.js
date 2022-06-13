import React, { useState, createRef, useCallback, useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Resizer from "react-image-file-resizer";
import { Edit2 } from "react-feather";
import { Link, useHistory } from "react-router-dom";

import Input from "../../../../components/Form/Input";
import TextArea from "../../../../components/Form/TextArea";
import FavouriteIconEmpty from "../../../../components/FavouriteIconEmpty";

import { toBase64 } from "../../../../lib/imageHelpers";
import checkUsername from "../../../../lib/checkUsername";

import {
  ProfileTile,
  ProfileAvatarContainer,
  ProfileAvatar,
  ProfileBio,
  ProfileName,
  ProfileMetrics,
  ProfileMetric,
  MetricValue,
  MetricLabel,
  EditProfileLink,
  ProfileNonLinkMetric,
  FileInput,
  EditProfileCircle,
  FavouritesContainer,
} from "./styles";
import { ThemeContext } from "styled-components";

import { useImageCrop } from "hooks/useImageCrop";
import { useAccount } from "hooks/useAccount";

export default ({ onProfileSave, onSave, profile }) => {
  const themeContext = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bioText, setBioText] = useState("");
  const [isEdit, setEdit] = useState(false);
  const history = useHistory();
  const nameError = checkUsername(displayName);

  const {
    uploadOriginalPicture,
    urlPhoto,
    pictureData,
    fileInput,
  } = useImageCrop();

  const { setAccount } = useAccount();

  useEffect(() => {
    setDisplayName((profile && profile.username) || "");
    setBioText((profile && profile.bio) || "");
  }, [profile && profile.id]);

  useEffect(() => {
    if (pictureData && pictureData.picture) {
      onProfileSave(pictureData.picture).then((result) => {
        setAccount(result);
      });
    }
  }, [pictureData])

  const onUpdate = useCallback(async () => {
    if (bioText.length <= 350) {
      if (nameError === null) {
        let base64BioText = "";
        if (bioText && bioText.length) {
          base64BioText = btoa(unescape(encodeURIComponent(bioText)));
        }

        const user = await onSave(displayName, base64BioText);
        if (user && user.id) {
          setEdit(false);
          history.replace("/" + encodeURIComponent(displayName));
        } else {
          setError("Username unavailable");
          // show error for duplicate name
        }
      } else if (nameError === "system") {
        setError("Username unavailable");
      }
    }
  }, [displayName, nameError, bioText, setError]);

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

  if (!profile) {
    return (
      <ProfileTile>
        <Skeleton width="100%" height={213} style={{backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeleton}}/>
      </ProfileTile>
    );
  }

  return (
    <ProfileTile>
      <ProfileAvatarContainer>
        <ProfileAvatar width={90} height={90} url={urlPhoto || profile.profilePic}>
          <EditProfileCircle>
            <FileInput
              type="file"
              name="coverPic"
              id="coverPic"
              ref={fileInput}
              className="mt-5"
              onChange={uploadOriginalPicture}
              accept="image/*"
            />
            <label htmlFor="coverPic">
              <Edit2 size={12} color="white" />
            </label>
          </EditProfileCircle>
        </ProfileAvatar>
      </ProfileAvatarContainer>
      {isEdit ? (
        <div className="mb-4">
          <Input
            name="displayName"
            onChange={(val) => onDisplayNameChange(val)}
            placeholder="Username"
            value={displayName}
            inputClassName="text-center"
          />
          {nameError === "short" ? (
            <label style={{ color: "#10a5f5" }}>
              Username must be three characters or more
            </label>
          ) : (error && error.length) ? (
            <label style={{ color: "#10a5f5" }}>{error}</label>
          ) : null}
        </div>
      ) : (
        <ProfileName>{displayName}</ProfileName>
      )}
      {isEdit ? (
        <div className="mb-4">
          <TextArea
            name="bio"
            onChange={(val) => onBioChange(val)}
            placeholder="Bio"
            value={bioText}
            className="text-center"
          />
          {bioText && bioText.length > 350 ? (
            <label style={{ color: "red" }}>
              Must be under 350 characters
            </label>
          ) : null}
        </div>
      ) : (
        <ProfileBio className="mb-5">{bioText || ""}</ProfileBio>
      )}
      <div className="mb-5">
        {isEdit ? (
          <EditProfileLink
            href="#"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onUpdate();
            }}
          >
            Save
          </EditProfileLink>
        ) : (
          <EditProfileLink
            href="#"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setEdit(true);
            }}
          >
            Edit profile
          </EditProfileLink>
        )}
      </div>
      <ProfileMetrics>
        <ProfileNonLinkMetric>
          <MetricValue>{profile.totalPosts || 0}</MetricValue>
          <MetricLabel>Posts</MetricLabel>
        </ProfileNonLinkMetric>
        <ProfileMetric to={`/profile/followers/${profile.id}`}>
          <MetricValue>{profile.followersCount || 0}</MetricValue>
          <MetricLabel>Followers</MetricLabel>
        </ProfileMetric>
        <ProfileMetric to={`/profile/following/${profile.id}`}>
          <MetricValue>{profile.followingCount || 0}</MetricValue>
          <MetricLabel>Following</MetricLabel>
        </ProfileMetric>
      </ProfileMetrics>
      <FavouritesContainer>
        <Link to="/favourites">
          <FavouriteIconEmpty
            width={24}
            height={24}
            strokeWidth={1.4} />
        </Link>
      </FavouritesContainer>
    </ProfileTile>
  );
};

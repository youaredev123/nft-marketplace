import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Resizer from "react-image-file-resizer";
import { Link, useHistory } from "react-router-dom";
import FavouriteIconEmpty from "components/FavouriteIconEmpty";

import { toBase64 } from "lib/imageHelpers";
import checkUsername from "lib/checkUsername";

import {
  EditProfileLink,
  FavouritesContainer,
  MetricLabel,
  MetricValue,
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileBio,
  ProfileMetric,
  ProfileMetrics,
  ProfileName,
  ProfileNonLinkMetric,
  ProfileTile, Wrapper,
} from "./styles";
import { ThemeContext } from "styled-components";

const ProfileDetailsDesktop = ({ onProfileSave, onSave, profile }) => {
  const themeContext = useContext(ThemeContext);
  const fileInput = createRef();
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(profile.profilePic);
  const [displayName, setDisplayName] = useState(profile.username || "");
  const [bioText, setBioText] = useState(profile.bio);
  const [isEdit, setEdit] = useState(false);
  const history = useHistory();
  const nameError = checkUsername(displayName);

  const onUpdate = useCallback(async () => {
    if (bioText.length <= 350) {
      if (nameError === null) {
        let base64BioText = "";
        if (bioText && bioText.length) {
          base64BioText = btoa(unescape(encodeURIComponent(bioText)));
        }

        const user = await onSave(displayName, base64BioText);
        if (user && user.id) {
          if (error) {
            setError(null);
          }
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

  const onUpdateProfilePic = useCallback(async (image) => {
    await onProfileSave(image);
  });

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
          await onUpdateProfilePic(base64Image);
          setPhoto(`data:image/gif;base64,${base64Image}`);
        },
        "blob"
      );
    }
  };

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

  const displayEmptyProfile = useCallback(() => {
    if (profile) {
      return (
        <ProfileTile>
          <ProfileAvatarContainer>
            <ProfileAvatar width={150} height={150} url={photo || profile.profilePic} />
          </ProfileAvatarContainer>
          <ProfileName>{displayName}</ProfileName>
          <ProfileBio className="mb-5">{bioText || ""}</ProfileBio>
          <div className="mb-5">
            <EditProfileLink to="/settings">
              Edit profile
            </EditProfileLink>
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
                width={26}
                height={26}
                strokeWidth={1.4}/>
            </Link>
          </FavouritesContainer>
        </ProfileTile>
      );
    }

    return (
      <ProfileTile>
        <Skeleton
          width="100%"
          height={213}
          style={{ backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeleton }}
        />
      </ProfileTile>
    );
  }, [profile]);

  return (
    <Wrapper>
      {displayEmptyProfile()}
    </Wrapper>
  );
};

export default ProfileDetailsDesktop;

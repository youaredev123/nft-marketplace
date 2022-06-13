import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Edit2 } from "react-feather";

import { useMyProfile } from "../../hooks/useMyProfile";
import { useAccount } from "../../hooks/useAccount";

import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import Header from "../../components/Header";
import { Title } from "../../components/Header/styles";

import {
  AvatarContainer,
  ProfileAvatar,
  FormContainer,
  EditProfileCircle,
} from "./styles";

export default () => {
  // const { push } = useHistory();
  const { myProfile } = useMyProfile();
  const [displayName, setDisplayName] = useState("");
  const [bioText, setBioText] = useState("");
  const [loading, setLoading] = useState(true);

  const onSave = () => {
    setLoading(true);

    setLoading(false);
  };

  const onDisplayNameChange = (value) => {
    if (value && value.length < 21 && value.match(/^[0-9a-zA-Z]+$/) != null) {
      setDisplayName(value);
    }
  };

  const onBioChange = (value) => {
    // && value.match(/^[a-z\d\-_\s]+$/i) != null
    if (value && value.length < 81) {
      setBioText(value);
    } else if (!value) {
      setBioText("");
    }
  };

  useEffect(() => {
    if (myProfile && myProfile.id) {
      setDisplayName(myProfile.username);
      if (myProfile.bio) {
        const bio = atob(myProfile.bio);
        if (bio && bio.length) {
          setBioText(bio);
        }
      }
    }
    setLoading(false);
  }, [myProfile, setDisplayName, setBioText, setLoading]);

  return (
    <>
      <Header title={<Title>Edit Profile</Title>} hasBack />
      <AvatarContainer className="py-5">
        <ProfileAvatar width={76} height={76} className="mb-4">
          <EditProfileCircle to="/profile/edit">
            <Edit2 size={12} color="white" />
          </EditProfileCircle>
        </ProfileAvatar>
      </AvatarContainer>
      <FormContainer>
        <div className="mb-4">
          <Input
            disabled={loading ? true : false}
            name="displayName"
            onChange={(val) => onDisplayNameChange(val)}
            placeholder="Username"
            value={displayName}
          />
        </div>
        <div className="mb-5">
          <TextArea
            name="bio"
            disabled={loading ? true : false}
            onChange={(val) => onBioChange(val)}
            placeholder="Bio"
            value={bioText}
          />
        </div>
        <Button className="primary" onClick={() => (loading ? null : onSave())}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </FormContainer>
    </>
  );
};

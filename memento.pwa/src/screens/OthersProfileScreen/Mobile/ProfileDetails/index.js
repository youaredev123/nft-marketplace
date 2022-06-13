import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";

import {
  ProfileTile,
  ProfileAvatarContainer,
  ProfileAvatar,
  ProfileFollowContainer,
  ProfileBio,
  ProfileName,
  ProfileMetrics,
  ProfileMetric,
  MetricValue,
  MetricLabel,
  FollowButton
} from "screens/OthersProfileScreen/Mobile/ProfileDetails/styles";
import { ThemeContext } from "styled-components";

const ProfileDetails = ({ profile, toggleFollow, currentUser }) => {
  let isSame = false;
  const themeContext = useContext(ThemeContext);

  if (profile && currentUser) {
    isSame = profile.id === currentUser.id;
  }

  const getFollowText = () => {
    if (profile.following) {
      return "Following";
    } else {
      return "Follow $0.10";
    }
  };

  if (profile) {
    return (
      <ProfileTile>
        <ProfileAvatarContainer>
          {profile && profile.profilePic ? (
            <ProfileAvatar
              width={90}
              height={90}
              url={profile && profile.profilePic}
            />
          ) : (
            <Skeleton
              style={{ backgroundColor: "var(--lightGrey)" }}
              width={90}
              height={90}
            />
          )}
        </ProfileAvatarContainer>
        <ProfileName>{profile && profile.username}</ProfileName>
        <ProfileBio className="mb-5">{profile && profile.bio}</ProfileBio>
        <ProfileMetrics>
          <ProfileMetric to={`/${encodeURIComponent(profile.username)}`}>
            <MetricValue>{profile.totalPosts}</MetricValue>
            <MetricLabel>Posts</MetricLabel>
          </ProfileMetric>
          <ProfileMetric to={`/profile/followers/${profile.id}`}>
            <MetricValue>{profile && profile.followersCount}</MetricValue>
            <MetricLabel>Followers</MetricLabel>
          </ProfileMetric>
          <ProfileMetric to={`/profile/following/${profile.id}`}>
            <MetricValue>{profile && profile.followingCount}</MetricValue>
            <MetricLabel>Following</MetricLabel>
          </ProfileMetric>
        </ProfileMetrics>
        {!isSame ? (
          <ProfileFollowContainer>
            <FollowButton
              onClick={() => toggleFollow(profile.username)}
              className={profile && profile.following ? "" : "primary"}
              style={{
                borderRadius: "40px",
                padding: "16px",
                fontSize: "18px"
              }}
            >
              {profile && getFollowText()}
            </FollowButton>
          </ProfileFollowContainer>
        ) : null}
      </ProfileTile>
    );
  }

  return (
    <ProfileTile>
      <Skeleton
        width="100%"
        height={207}
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeleton
        }}
      />
    </ProfileTile>
  );
};

export default ProfileDetails;

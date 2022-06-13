import {
  CoverImage,
  Divider,
  Earned,
  Heading,
  MetricLabel,
  MetricValue,
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileBio,
  ProfileContainer,
  ProfileMetric,
  ProfileMetrics,
  ProfileName,
  ProfileTile,
  SidebarWrapper
} from "components/Sidebar/styles";
import Notifications from "components/Sidebar/Notifications";
import React, { useCallback, useEffect, useState } from "react";
import { IncomeTotalValue } from "screens/HomeScreen/styles";
import UserService from "services/UserService";
import Invitation from "components/Sidebar/Invitation";
import { Link } from "react-router-dom";
import useCurrentUser from "hooks/useCurrentUser";
import { truncate } from "lib/utils";
import useIsMounted from "hooks/useIsMounted";
import useWindowDimensions from "hooks/useWindowWidth";
import PlaceHolderAvatar from 'assets/images/avatar-placeholder.png';
import Discovers from "components/Sidebar/Discovers.js";

const Sidebar = () => {
  const isMounted = useIsMounted();
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const { windowWidth } = useWindowDimensions();
  const [earnedTotal, setEarnedTotal] = useState(0);
  const [earnedLoaded, setEarnedLoaded] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (isMounted) {
      UserService.totalEarned().then(async (response) => {
        if (!response.hasError) {
          setEarnedLoaded(true);
          setEarnedTotal(response.data.totalEarned);
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const displayBioText = useCallback(() => {
    if (!currentUser || !currentUser.bio || !currentUser.bio.length) {
      return null;
    }

    try {
      const result = decodeURIComponent(escape(atob(currentUser.bio)));
      return result.length > 200 ? truncate(result, 200) + "..." : result;
    } catch (e) {
      return currentUser.bio;
    }
  }, [currentUser]);

  const displayCover = useCallback(() => {
    return (
      <Link to={`/${currentUser?.username || '#'}`}>
        <CoverImage url={currentUser?.bannerPic || PlaceHolderAvatar} hasImage={!!currentUser?.bannerPic}/>
      </Link>
    );
  }, [currentUser]);

  const displayAvatar = useCallback(() => {
    if (!currentUser?.profilePic) {
      return null;
    }

    return (
      <Link to={`/${currentUser?.username || '#'}`}>
        <ProfileAvatar
          width={120}
          height={120}
          url={currentUser.profilePic}
        />
      </Link>
    );
  }, [currentUser]);

  const showEarned = useCallback(() => !earnedLoaded ? null :
    <IncomeTotalValue>${earnedTotal}</IncomeTotalValue>, [earnedLoaded, earnedTotal]);

  if (windowWidth <= 1000) {
    return null;
  }

  return (
    <SidebarWrapper>
      <ProfileContainer>
        {displayCover()}
        <ProfileTile>
          <ProfileAvatarContainer>
            {displayAvatar()}
          </ProfileAvatarContainer>
          <ProfileName style={{textAlign: 'center'}} className={"mb-3"}>{currentUser.username}</ProfileName>
          <ProfileBio style={{textAlign: 'center'}} className={"mb-3"}>{displayBioText()}</ProfileBio>
          <ProfileMetrics className={"mb-3"}/>
          <ProfileMetrics className={"mb-3"}>
            <ProfileMetric to={`/profile/followers/${currentUser.id}`} style={{ marginRight: "5px" }}>
              <MetricLabel>Followers:&nbsp;</MetricLabel>
              <MetricValue>{currentUser.followersCount || 0}</MetricValue>
            </ProfileMetric>
          </ProfileMetrics>
          <ProfileMetrics className={"mb-3"}>
            <ProfileMetric to={`/profile/following/${currentUser.id}`}>
              <MetricLabel>Following:&nbsp;</MetricLabel>
              <MetricValue>{currentUser.followingCount || 0}</MetricValue>
            </ProfileMetric>
          </ProfileMetrics>
          <Earned to={`/notifications/income`}>Earned: {showEarned()}</Earned>

          <Divider/>
          <div className={"px-0 py-2"}>
            <Heading>
              <Link to={`/notifications`}>
                Notifications
              </Link>
            </Heading>
            <Notifications currentUser={currentUser} maxItems={6}/>
          </div>
          <Divider/>
          <div className={"px-0 py-2"}>
            <Heading>
              <Link to={`/leaderboard`}>
                Leaderboard
              </Link>
            </Heading>
            <Discovers maxItems={5}/>
          </div>
          <Divider/>
          <div className={"px-0 py-2"}>
            <Heading>
              <Link to={`/settings/invitation`}>
                Invite Friends and Earn
              </Link>
            </Heading>
            <Invitation currentUser={currentUser}/>
          </div>
        </ProfileTile>
      </ProfileContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;

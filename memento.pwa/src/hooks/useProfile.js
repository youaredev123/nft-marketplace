import { useState, useCallback } from "react";
import {
  UserRepository,
  fetchUserById,
  fetchUserByName,
  updateBasicInfo,
  updateProfilePic,
  updateBannerPic,
  updatePostsForUsername,
  updateCommentsForUsername
} from "api";

const useProfile = () => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState(undefined);

  const fetchProfileFromApiById = useCallback(async (userId) => {
    const apiUser = await fetchUserById(userId);
    if (apiUser) {
      setError(undefined);
      setProfile(apiUser);
      return apiUser;
    } else {
      setError("id does not exist");
      return null;
    }
  }, []);

  const fetchProfileFromApiByName = useCallback(async (username) => {
    const apiUser = await fetchUserByName(username);
    if (apiUser) {
      setError(undefined);
      setProfile(apiUser);
      return apiUser;
    } else {
      setError("username does not exist");
      return null;
    }
  }, []);

  const fetchProfileById = useCallback(
    async (userId, forceRefresh = false) => {
      const userData = forceRefresh
        ? null
        : await UserRepository.getByObj({ id: userId });
      if (userData && userData.id) {
        setError(undefined);
        setProfile(userData);
        return userData;
      } else {
        console.log('fetch new user');
        return await fetchProfileFromApiById(userId);
      }
    },
    [fetchProfileFromApiById, setError, setProfile]
  );

  const fetchProfileByName = useCallback(
    async (username, forceRefresh = false) => {
      const userData = forceRefresh
        ? null
        : await UserRepository.getByObj({ username });
      if (userData && userData.id) {
        setError(undefined);
        setProfile(userData);
        return userData;
      } else {
        return await fetchProfileFromApiByName(username);
      }
    },
    [fetchProfileFromApiByName, setError, setProfile]
  );

  const updateBannerImage = useCallback(
    async (image) => {
      if (profile && profile.id) {
        const user = await updateBannerPic(profile.id, image);
        if (user && user.id) {
          setError(undefined);
          setProfile(user);
          return user;
        }
        return null;
      } else {
        console.error("Account not found");
        return null;
      }
    },
    [profile]
  );

  const updateProfileImage = useCallback(
    async (image) => {
      if (profile && profile.id) {
        const user = await updateProfilePic(profile.id, image);
        if (user && user.id) {
          setError(undefined);
          setProfile(user);
          return user;
        }
        return null;
      } else {
        console.error("Account not found");
        return null;
      }
    },
    [profile]
  );

  const updateBioAndUsername = useCallback(
    async (username, bio, onSuccess) => {
      if (profile && profile.id) {
        let oldUsername = profile.username;
        const user = await updateBasicInfo(profile.id, username, bio);
        if (user && user.id) {
          onSuccess();
          await updatePostsForUsername(oldUsername, username);
          await updateCommentsForUsername(oldUsername, username);
          setError(undefined);
          setProfile(user);
          return user;
        }
        return null;
      } else {
        console.error("Account not found");
        return null;
      }
    },
    [profile]
  );

  const fixFollowingProfile = useCallback(
    (isFollowing) => {
      if (profile && profile.id && profile.following !== isFollowing) {
        profile.following = isFollowing;
        if (isFollowing) {
          profile.followersCount += 1;
        } else {
          profile.followersCount -= 1;
        }
        setError(undefined);
        setProfile(profile);
      }
    },
    [profile, setProfile, setError]
  );

  return {
    profile,
    error,
    fetchProfileById,
    fetchProfileByName,
    setProfile,
    updateBannerImage,
    updateBioAndUsername,
    updateProfileImage,
    fixFollowingProfile
  };
};

export default useProfile;

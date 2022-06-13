import { useEffect, useCallback } from "react";

import useCurrentUser from "./useCurrentUser";
import useUsersPosts from "./useUsersPosts";
import useProfile from "./useProfile";

const useMyProfile = (maxPage = 42) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const {
    profile,
    fetchProfileById,
    updateBioAndUsername,
    updateBannerImage,
    updateProfileImage,
    error
  } = useProfile();
  const {
    fetchPosts,
    loading,
    posts,
    currentPage,
    hasNextPage
  } = useUsersPosts(maxPage);

  const updateBioAndUserNameAndCurrentUser = useCallback(
    async (username, bio) => {
      const user = await updateBioAndUsername(username, bio, () => {});
      if (user && user.id) {
        setCurrentUser(user);
        return user;
      }

      return undefined;
    },
    [updateBioAndUsername, setCurrentUser]
  );

  const updateBannerImageAndCurrentUser = useCallback(
    async (image) => {
      const user = await updateBannerImage(image);
      if (user && user.id) {
        setCurrentUser(user);
        return user;
      }
      return undefined;
    },
    [updateBannerImage, setCurrentUser]
  );

  const updateProfileImageAndCurrentUser = useCallback(
    async (image) => {
      const user = await updateProfileImage(image);
      if (user && user.id) {
        setCurrentUser(user);
        return user;
      }
      return undefined;
    },
    [updateProfileImage, setCurrentUser]
  );

  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchProfileById(currentUser.id, true);
    } else {
      console.error("Current user not found");
    }
  }, [fetchProfileById]);

  return {
    userError: error,
    fetchPosts,
    loading,
    posts,
    currentPage,
    hasNextPage,
    profile,
    updateBioAndUsername: updateBioAndUserNameAndCurrentUser,
    updateBannerImage: updateBannerImageAndCurrentUser,
    updateProfileImage: updateProfileImageAndCurrentUser
  };
};

export default useMyProfile;

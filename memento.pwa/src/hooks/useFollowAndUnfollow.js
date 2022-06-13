import { useCallback } from "react";
import { UserRepository } from "../api";
import useProfile from "./useProfile";
import useCurrentUser from "./useCurrentUser";

const useFollowAndUnfollow = () => {
  const { currentUser } = useCurrentUser();
  const {
    profile,
    fetchProfileById,
    fetchProfileByName,
    fixFollowingProfile,
    error
  } = useProfile();

  const updateFollowingCurrentUser = useCallback(
    async (value) => {
      if (currentUser && currentUser.username) {
        const dbUser = await UserRepository.getByObj({
          username: currentUser.username,
        });
        if (dbUser && dbUser.username) {
          await UserRepository.update(currentUser.id, {
            followingCount: dbUser.followingCount + value,
          });
        }
      }
    },
    [currentUser]
  );

  const onFollowStart = useCallback(() =>
    (async () => {
      fixFollowingProfile(true);
      await updateFollowingCurrentUser(1);
    })(), [fixFollowingProfile]
  );

  const onFollowFail = useCallback(() =>
    (async () => {
      fixFollowingProfile(false);
      await updateFollowingCurrentUser(-1);
    })(), [fixFollowingProfile]
  );

  const onUnfollowStart = onFollowFail;
  const onUnfollowFail = onFollowStart;

  return {
    userError: error,
    currentUser,
    onFollowStart,
    onFollowFail,
    onUnfollowStart,
    onUnfollowFail,
    fetchProfileById,
    fetchProfileByName,
    profile,
  };
};

export default useFollowAndUnfollow;

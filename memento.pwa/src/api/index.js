import { v4 as uuid } from "uuid";
import firebase from "firebase/app";
import User from "./user";

import db from "../dbInit";

import ContentService from "../services/ContentService";
import UserService from "../services/UserService";

/**
 * Manages the IndexedDB stored in the browser
 */

const UserRepository = new User(db);

/**
 * Converts base64 string to Blob type
 * @param {string} b64Data
 * @param {string} contentType
 * @param {number} sliceSize
 */
export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export async function updatePostLikes(id) {
  let response = await ContentService.likes(id);
  if (!response.hasError) {
    const updateObject = { likes: response.data };
    await db.posts.update(id, updateObject);
    return await getPost(id);
  }
}

export async function getPosts(keys = []) {
  let posts = [];
  if (keys && keys.length) {
    posts = await db.posts.bulkGet(keys);
  } else {
    posts = await db.posts.toArray();
  }
  if (posts && posts.length) {
    return posts.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return b.timestamp.localeCompare(a.timestamp);
      }
      return 1;
    });
  }
  return posts;
}

export const clearDb = async () => {
  db.comments.clear();
  db.posts.clear();
};

export const refreshCurrentUser = async () => {
  const updateObject = {};
  const response = await UserService.myProfile();
  console.log('response====>',response)
  if (!response.hasError) {
    // Sign into FB annonymously
    const customChatToken = response.data.chatAuthToken;
    if (!customChatToken) {
      // Sign in user for the first time
      firebase
        .auth()
        .signInAnonymously()
        .then((user) => {
          // Fire a call to the back end to create the custom token, pass in UID
          UserService.generateFirebaseToken(user.user.uid);
        });
    } else {
      // If login token is already there log the user in
      firebase.auth().signInWithCustomToken(customChatToken);
    }

    let _bio = "";
    if (response.data.bio) {
      _bio = decodeURIComponent(escape(atob(response.data.bio)));
    }
    updateObject.id = response.data.userId;
    updateObject.username = response.data.username;
    updateObject.profilePic = `${response.data.profilePicLocation}`;
    updateObject.bannerPic = `${response.data.bannerPicUrlLocation}`;
    updateObject.following = response.data.following;
    updateObject.follower = response.data.follower;
    updateObject.bio = _bio;
    updateObject.chatToken = customChatToken;
    updateObject.followersCount = response.data.followersCount;
    updateObject.followingCount = response.data.followingCount;
    updateObject.postIds = [];
    updateObject.totalPosts = response.data.totalPosts;
    updateObject.partner = response.data.partner;
    updateObject.currentCountry = response.data.currentCountry;
    updateObject.customLikeAmount = response.data.customLikeAmount;

    const reverseBackendWalletTypesMap = Object.fromEntries(
      Object.entries(UserService.BACKEND_WALLETS_MAP).map(([k, v]) => [v, k])
    );
    if (Array.isArray(response.data.wallets)) {
      const entries = response.data.wallets.map(wallet => {
        const { walletType, ...newWallet } = wallet;
        return [
          reverseBackendWalletTypesMap[walletType] || null,
          newWallet,
        ];
      }).filter(([k, v]) => k !== null);
      updateObject.wallets = Object.fromEntries(entries);
    } else {
      updateObject.wallets = {};
    }
    updateObject.oneClickPayments = response.data.oneClickPayments;
    updateObject.darkMode = response.data.darkMode;
    updateObject.purchases = response.data.purchases;
    updateObject.privateAccount = response.data.privateAccount;
    updateObject.relicTcs = response.data.relicTcs;
  } else {
    console.error("Error fetching profile", response);
  }

  const user = await UserRepository.get(updateObject.id);

  if (user && user.id) {
    return await UserRepository.update(updateObject.id, updateObject);
  } else {
    return await UserRepository.create(updateObject);
  }
};

/* Fetch latest details for the id */
export const fetchUserById = async (userId) =>
  fetchUser(UserService.profileById(userId));

export const fetchUserByName = async (username) =>
  fetchUser(UserService.profileByName(username));

const fetchUser = async (fetchUserRequest) => {
  const updateObject = {};
  const response = await fetchUserRequest;

  if (!response.hasError) {
    updateObject.id = response.data.userId;
    updateObject.username = response.data.username;
    updateObject.following = response.data.following;
    updateObject.follower = response.data.follower;
    updateObject.profilePic = `${response.data.profilePicLocation}`;
    updateObject.bannerPic = `${response.data.bannerPicUrlLocation}`;
    updateObject.privateAccount = response.data.privateAccount;
    updateObject.customLikeAmount = response.data.customLikeAmount;
    // we need to catch the error just in case bio param has illegal characters in it
    try {
      updateObject.bio =
        response.data.bio && response.data.bio.length > 0
          ? decodeURIComponent(escape(atob(response.data.bio)))
          : "";
    } catch (error) {
      updateObject.bio = "";
      console.error(response.data.bio);
      console.error({ error });
    }
    updateObject.followersCount = response.data.followersCount;
    updateObject.followingCount = response.data.followingCount;
    updateObject.totalPosts = response.data.totalPosts;
    updateObject.postIds = [];
  } else {
    console.error("Error fetching profile", response);
    return null;
  }

  const obj = await UserRepository.get(updateObject.id);
  if (obj && obj.id) {
    return await UserRepository.update(updateObject.id, updateObject);
  } else if (updateObject.id && updateObject.id.length > 0) {
    return await UserRepository.create(updateObject);
  } else {
    return null;
  }
};

export const updateProfilePic = async (id, profilePic) => {
  const updateObject = {
    id,
  };
  let profilePicRequest = UserService.updateMyProfilePic(profilePic).then(
    (response) => {
      if (!response.hasError) {
        updateObject.profilePic = `${response.data.profilePicLocation}`;
      }
    }
  );

  await Promise.all([profilePicRequest]);

  const user = await UserRepository.get(id);

  if (user && user.id === id) {
    return await UserRepository.update(id, updateObject);
  } else {
    return await UserRepository.create(updateObject);
  }
};

export const updateBannerPic = async (id, bannerPic) => {
  const updateObject = {
    id,
  };
  let bannerPicRequest = UserService.updateMyCoverPic(bannerPic).then(
    (response) => {
      if (!response.hasError) {
        updateObject.bannerPic = `${response.data.bannerPicLocation}`;
      }
    }
  );

  await Promise.all([bannerPicRequest]);

  const user = await UserRepository.get(id);

  if (user && user.id === id) {
    return await UserRepository.update(id, updateObject);
  } else {
    if (updateObject.id && updateObject.id.length > 0) {
      return await UserRepository.create(updateObject);
    }
  }
};

export const updatePostsForUsername = async (oldUsername, newUsername) => {
  const posts = await db.posts.where({ username: oldUsername }).toArray();
  if (posts && posts.length) {
    posts.forEach((post) => {
      db.posts.update(post.id, { username: newUsername });
    });
  }
};

export const updateCommentsForUsername = async (oldUsername, newUsername) => {
  const comments = await db.comments.where({ username: oldUsername }).toArray();
  if (comments && comments.length) {
    comments.forEach((comment) => {
      db.comments.update(comment.id, { username: newUsername });
    });
  }
};

export const updateBasicInfo = async (id, username, bio) => {
  let duplicateUsernameError = false;
  const updateObject = {
    id,
  };
  let usernameRequest = UserService.updateMyUsername(username).then(
    (response) => {
      if (!response.hasError) {
        updateObject.username = username;
      }
      if (response.status === 500) {
        duplicateUsernameError = true;
      }
    }
  );

  let bioRequest = UserService.updateMyBio(bio).then((response) => {
    if (!response.hasError) {
      updateObject.bio = decodeURIComponent(escape(atob(bio)));
    }
  });

  await Promise.all([usernameRequest, bioRequest]);

  if (duplicateUsernameError) {
    return undefined;
  }

  const user = await UserRepository.get(id);

  if (user && user.id === id) {
    return await UserRepository.update(id, updateObject);
  } else {
    if (updateObject.id && updateObject.id.length > 0) {
      return await UserRepository.create(updateObject);
    }
  }
};

export const getUser = async (id) => {
  return await db.users.get({ id });
};

export const updateUser = async (data) => {
  return await db.users.put(data);
};

export async function getPost(id) {
  return await db.posts.get({ id });
}

export async function getComments(postId) {
  return await db.comments.where({ postId }).toArray();
}

export async function getNewComments(postId) {
  const response = await ContentService.comments(postId);
  if (!response.hasError) {
    db.comments.bulkPut(
      response.data.comments.map((c) => ({
        id: `${postId}:${c.username}:${c.comment}`, // ID is not returned from server, so trying to create an ID that is the same for each request
        text: decodeURIComponent(escape(atob(c.comment))),
        username: c.username,
        postId: postId,
      }))
    );

    return await getComments(postId);
  }
}

export async function getNumberOfComments(postId) {
  const count = await db.comments.where({ postId }).count();
  return count ?? 0;
}

export async function createPost(userId, image) {
  return await db.posts.add({ id: uuid(), userId, image });
}

export async function createComment(userId, postId, text) {
  await db.comments.add({
    id: uuid(),
    postId,
    userId,
    text: escape(atob(text)),
  });
}

export async function getMyPosts() {
  return await db.posts.orderBy("id").reverse().toArray();
}

export { db, UserRepository };

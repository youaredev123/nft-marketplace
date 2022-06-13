import BaseService from "./BaseService";

class UserService extends BaseService {
  BACKEND_WALLETS_MAP = {
    moneybutton: "MONEY_BUTTON",
    handcash: "HAND_CASH"
  };

  loginMoneyButton = async ({ authToken, id }) =>
    this.post({
      url: `${this.API_PATH}/login/money-button`,
      data: {
        authToken,
        id
      }
    });

  signupMoneyButton = async ({
    username,
    id,
    profilePicLocation,
    authToken,
    referrerUserId
    // exclusivity,
    // pricePerLike,
    // not using adult at the moment
    // adult
  }) =>
    this.post({
      url: `${this.API_PATH}/create/money-button`,
      headers: {
        ignoreAuthorization: true
      },
      data: {
        username,
        id,
        profilePicLocation,
        authToken,
        referrerUserId
        // otherAccount: adult,
        // privateAccount: exclusivity,
        // customLikeAmount: pricePerLike
      }
    });

  loginHandCash = async ({ authToken }) =>
    this.post({
      url: `${this.API_PATH}/login/hand-cash`,
      data: {
        authToken
      }
    });

  signupHandCash = async ({
    username,
    id,
    profilePicLocation,
    authToken,
    referrerUserId
    // exclusivity,
    // pricePerLike,
    // not using adult at the moment
    // adult
  }) =>
    this.post({
      url: `${this.API_PATH}/create/hand-cash`,
      headers: {
        ignoreAuthorization: true
      },
      data: {
        username,
        id,
        profilePicLocation,
        authToken,
        referrerUserId
        // otherAccount: adult,
        // privateAccount: exclusivity,
        // customLikeAmount: pricePerLike
      }
    });

  generateFirebaseToken = async (uid) =>
    this.patch({
      url: `${this.API_PATH}/firebase-user-id`,
      data: {
        token: uid
      }
    });

  updateMessagingToken = async (token) =>
    this.patch({
      url: `${this.API_PATH}/messaging-token`,
      data: {
        token
      }
    });

  // fetches the profile for a user
  myProfile = async () =>
    this.get({
      url: `${this.API_PATH}/profile`
    });

  // fetches the bio for a user
  myBio = async () =>
    this.get({
      url: `${this.API_PATH}/bio`
    });

  // updates the bio for a user
  updateMyBio = async (bio) =>
    this.patch({
      url: `${this.API_PATH}/bio`,
      data: {
        bio
      }
    });

  // updates the username for a user
  updateMyUsername = async (username) =>
    this.patch({
      url: `${this.API_PATH}/username`,
      data: {
        username
      }
    });

  // fetches the profile pic for a user
  myProfilePic = async () =>
    this.get({
      url: `${this.API_PATH}/profile-pic`
    });

  // updates the profile pic for a user
  updateMyProfilePic = async (profilePic) =>
    this.put({
      url: `${this.API_PATH}/profile-pic`,
      data: {
        profilePicLocation: profilePic
      }
    });

  // fetches the banner pic for a user
  myCoverPic = async () =>
    this.get({
      url: `${this.API_PATH}/banner-pic`
    });

  // updates the banner pic for a user
  updateMyCoverPic = async (bannerPic) =>
    this.put({
      url: `${this.API_PATH}/banner-pic`,
      data: {
        bannerPicLocation: bannerPic
      }
    });

  // fetches the profile for a user by id
  profileById = async (userId) =>
    this.get({
      url: `${this.API_PATH}/profile/user-id/${userId}`
    });

  // fetches the profile for a user by name
  profileByName = async (username) =>
    this.get({
      url: `${this.API_PATH}/profile/${username}`
    });

  // fetches the bio for a user
  coverPic = async (username) =>
    this.get({
      url: `${this.API_PATH}/banner-pic/${username}`
    });

  // fetches the bio for a user
  bio = async (username) =>
    this.get({
      url: `${this.API_PATH}/bio/${username}`
    });

  // fetches the profile pic for a user
  profilePic = async (username) =>
    this.get({
      url: `${this.API_PATH}/profile-pic/${username}`
    });

  // fetches the banner pic for a user
  coverPic = async (username) =>
    this.get({
      url: `${this.API_PATH}/banner-pic/${username}`
    });

  // fetches the followers for a user
  followers = async ({ userId = undefined, page = 0, size = 10 }) =>
    this.get({
      url: `${this.API_PATH}/followers/${userId}`,
      params: {
        page,
        size
      }
    });

  // fetches the people the user is following
  following = async ({ userId = undefined, page = 0, size = 10 }) =>
    this.get({
      url: `${this.API_PATH}/following/${userId}`,
      params: {
        page,
        size
      }
    });

  totalEarned = () =>
    this.get({
      url: `${this.API_PATH}/activity/total-earned`
    });

  postEarnings = ({ page = 0, size = 10 }) =>
    this.get({
      url: `${this.API_PATH}/activity/post-earnings`,
      params: {
        page,
        size
      }
    });

  setOneClickPayments = (enabled) => {
    const endpoint = enabled ? "enabled" : "disabled";
    this.put({
      url: `${this.API_PATH}/wallet/one-click/${endpoint}`
    });
  };

  setDarkMode = (enabled) =>
    this.patch({
      url: `${this.API_PATH}/dark-mode`,
      data: {
        enabled
      }
    });

  // updates profile exclusivity
  updateExclusivity = async (exclusivity) =>
    this.patch({
      url: `${this.API_PATH}/private-account`,
      data: {
        enabled: exclusivity
      }
    });

  // updates custom like amount
  updateCustomLikeAmount = async (amount) =>
    this.patch({
      url: `${this.API_PATH}/custom-like-amount`,
      data: {
        amount
      }
    });

  // get active wallet
  getActiveWallet = async () =>
    this.get({
      url: `${this.API_PATH}/active-wallet`
    });

  relicTcs = data =>
    this.patch({
      url: `${this.API_PATH}/relic-tcs`,
      data,
    });

  // create a wallet
  createWallet = async (data) => this.put({ url: `${this.API_PATH}/wallet/relica`, data })

  // get seed a wallet
  recoverWallet = async (password) => this.put({
    url: `${this.API_PATH}/wallet/relica`,
    data : { password }
  })

  // check email exits or not
  checkWalletEmail = async (email) => this.get({
    url: `${this.API_PATH}/wallet/relica/email-exists?email=${email}`
  })

  // get wallet info
  getWallet = async (password) => this.get({
    url: `${this.API_PATH}/wallet/relica/login`,
    headers: {
      'relica-wallet-user-password': password
    }
  });

  getKeys = async (password) => this.get({
    url: `${this.API_PATH}/wallet/relica`,
    headers: {
      'relica-wallet-encrypted-password': password
    }
  });

  saveCurrentCountry = (countryCode) => this.put({
    url: `/country`,
    data: { 
      country: countryCode
    }
  })
}

export default new UserService();

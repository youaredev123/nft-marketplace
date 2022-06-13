import BaseService from "./BaseService";

class ContentService extends BaseService {
  latest = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/latest`,
      params: {
        page,
        size
      }
    });

  latestForUser = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/latest-for-user`,
      params: {
        page,
        size
      }
    });

  latestForUserDesktop = async () =>
    this.get({
      url: `${this.API_PATH}/desktop/latest-for-user`
    });

  info = async (contentId) =>
    this.get({
      url: `${this.API_PATH}/picture/info/${contentId}`
    });

  likePicture = async (likeId) =>
    this.patch({
      url: `${this.API_PATH}/like/${likeId}`
    });

  unlikePicture = async (likeId) =>
    this.patch({
      url: `${this.API_PATH}/unlike/${likeId}`
    });

  picture = async (contentId) =>
    this.get({
      url: `${this.API_PATH}/picture/${contentId}`
    });

  comments = async (contentId) =>
    this.get({
      url: `${this.API_PATH}/comments`,
      params: {
        contentId
      }
    });

  exploreMostCommented = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/most-comments`,
      params: {
        page,
        size
      }
    });

  exploreMostLiked = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/most-likes`,
      params: {
        page,
        size
      }
    });

  exploreImages = async (hashtag, filterParameter, page = 0, size = 42) =>
    this.get({
      url: `${this.API_PATH}/search/hashtag/${filterParameter}`,
      params: {
        hashtag,
        page,
        size
      }
    });

  exploreUsers = async (userName, page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/search/user/${userName}`,
      params: {
        page,
        size
      }
    });

  exploreMostFollowedUsers = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/search/most-followers`,
      params: {
        page,
        size
      }
    });

  exploreUsersLeaderboard = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/leaderboard`,
      params: {
        page,
        size
      }
    });

  explorePrivateUsers = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/search/private-profiles`,
      params: {
        page,
        size
      }
    });

  myPosts = (username = undefined, page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/user-pictures-content-ids`,
      params: {
        page,
        size,
        username
      }
    });

  getUrl = (pictureId, imageType) =>
    this.get({
      url: `${this.API_PATH}/temp/upload/${pictureId}`,
      params: { imageType }
    });

  favPicture = async (favId) =>
    this.patch({
      url: `${this.API_PATH}/fav/${favId}`
    });

  unfavPicture = async (favId) =>
    this.patch({
      url: `${this.API_PATH}/unfav/${favId}`
    });

  favourites = async (page = 0, size = 21) =>
    this.get({
      url: `${this.API_PATH}/favourites`,
      params: {
        page,
        size
      }
    });

  changePrivateProfile = async (isPrivate, uid) =>
    this.patch({
      url: `${this.API_PATH}/private-account`,
      data: {
        privateAccount: isPrivate,
        userId: uid
      }
    });

  hidePost = async (id) => {
    this.patch({
      url: `${this.API_PATH}/hide/picture/${id}`,
      data: {
        contentId: id
      }
    });
  };

  hidePicture = async (contentId) =>
    this.put({
      url: `${this.API_PATH}/picture/hide/${contentId}`
    });

  leaderboard = async (page = 0, size = 10) =>
    this.get({
      url: `${this.API_PATH}/leaderboard`,
      params: {
        page,
        size
      }
    });
}

export default new ContentService();

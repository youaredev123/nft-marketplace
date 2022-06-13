import BaseService from "./BaseService";

class BlockChainService extends BaseService {
  picture = (data) =>
    this.post({
      url: `${this.API_PATH}/picture/prepare`,
      data,
    });

  firstPicture = (data) =>
    this.post({
      url: `${this.API_PATH}/picture/first`,
      data,
    });

  darkMode = data =>
    this.post({
      url: `${this.API_PATH}/dark-mode/prepare`,
      data,
    });

  unlockMap = data =>
    this.post({
      url: `${this.API_PATH}/prepare/maps`,
      data,
    });

  privatePrepare = data =>
    this.post({
      url: `${this.API_PATH}/private-account/prepare`,
      data,
    });

  picture2 = (data) =>
    this.post({
      url: `${this.API_PATH}/picture/prepare/v2`,
      data,
    });

  like = (data) =>
    this.post({
      url: `${this.API_PATH}/like/prepare`,
      data,
    });

  comment = (data) =>
    this.post({
      url: `${this.API_PATH}/comment/prepare`,
      data,
    });

  addToFavourites = (data) =>
    this.post({
      url: `${this.API_PATH}/favourites/prepare`,
      data,
    });

  follow = (data) =>
    this.post({
      url: `${this.API_PATH}/follow/prepare`,
      data,
    });

  relic = (data) =>
    this.post({
      url: `${this.API_PATH}/prepare/relic`,
      data,
    });

  dummyToken = (token) =>
    this.post({
      url: `${this.API_PATH}/dummy/firebase/${token}`,
      headers: { ignoreAuthorization: true },
    });

  notifyHcSuccess = ({ type, buttonData, txId }) =>
    this.post({
      url: `${this.API_PATH}/hc/success`,
      data: {
        buttonId: type,
        buttonData,
        txId,
      },
    });
}

export default new BlockChainService();

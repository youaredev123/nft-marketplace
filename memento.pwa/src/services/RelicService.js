import BaseService from "./BaseService";

class RelicService extends BaseService {
  addTxId = data =>
    this.put({
      url: `${this.API_PATH}/tx-id`,
      data,
    });

  buryCheck = ({ lon, lat, countryCode }) =>
    this.get({
      url: `${this.API_PATH}/bury-check?lon=${lon}&lat=${lat}&countryCode=${countryCode}`,
    });

  // countries = () =>
  //   this.get({
  //     url: `${this.API_PATH}/countries`,
  //   });

  unlock = ({ lon, lat, countryCode }) =>
    this.get({
      url: `${this.API_PATH}/unlock?lon=${lon}&lat=${lat}&countryCode=${countryCode}`,
    });

  unlockMyRelic = ({ relicId }) =>
    this.get({
      url: `${this.API_PATH}/unlock-my-relic/${relicId}`,
    });

  // createUnlockTransaction = data =>
  //   this.post({
  //     url: `${this.API_PATH}/create-unlock-transaction`,
  //     data,
  //   });

  unlockRelicAndCreateTransaction = ({ lon, lat, countryCode }) =>
    this.get({
      url: `${this.API_PATH}/unlock-relic?lon=${lon}&lat=${lat}&countryCode=${countryCode}`,
    });

  unlockMyRelicAndCreateTransaction = ({ relicId }) =>
    this.get({
      url: `${this.API_PATH}/unlock-mine/${relicId}`,
    });

  discover = ({ countryCode }) =>
    this.get({
      url: `${this.API_PATH}/discover?countryCode=${countryCode}`,
    });

  myBuried = ({ page, size }) =>
    this.get({
      url: `${this.API_PATH}/my-buried?page=${page}&size=${size}`,
    });

  myDug = ({ page, size }) =>
    this.get({
      url: `${this.API_PATH}/my-discovered?page=${page}&size=${size}`,
    });

  otherBuriers = ({ page, size, countryCode }) =>
    this.get({
      url: `${this.API_PATH}/others?countryCode=${countryCode}&page=${page}&` +
        `size=${size}`,
    });

  relicsByUser = ({ userId, page, size }) =>
    this.get({
      url: `${this.API_PATH}/user/${userId}?page=${page}&` +
        `size=${size}`,
    });

  getRelic = ({ id }) =>
    this.get({
      url: `${this.API_PATH}/id/${id}`,
    })

  prepareRelic = data =>
    this.post({
      url: `${this.API_PATH}/prepare/relic`,
      data,
    })
}

export default new RelicService();

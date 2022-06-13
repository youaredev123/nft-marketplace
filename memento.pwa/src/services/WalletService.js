import BaseService from "./BaseService";

class WalletService extends BaseService {
  createBSVWallet = async (data) =>
    this.post({
      url: `${this.API_PATH}/create-bsv-wallet`,
      data
    })

  sendBSV = async (owner, purse, address, amount) =>
    this.post({
      url: `${this.API_PATH}/send-bsv`,
      data: {
        owner,
        purse,
        address,
        amount
      }
    })
}

export default new WalletService();
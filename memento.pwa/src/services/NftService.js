import BaseService from "./BaseService";

class NftService extends BaseService {
  getOrder = ({ page, size, price, orderType }) =>
    this.get({
      url: `${this.API_PATH}/orders/${orderType}?page=${page}&size=${size}&price=${price}`,
    });
  
  getMyNft = ({ page, size, password }) =>
    this.get({
      url: `${this.API_PATH}/nft/mine?page=${page}&size=${size}`,
      headers: {
        'relica-wallet-encrypted-password': password
      }
    });

  getCollection = ({ page, size, password }) =>
    this.get({
      url: `${this.API_PATH}/get-nft-collection?page=${page}&size=${size}`,
      headers: {
        'relica-wallet-encrypted-password': password
      }
    });

  uploadImage = async (data, password) => 
    this.post({
      url: `${this.API_PATH}/upload-image`,
      data,
      headers: {
        'accept': '*/*',
        'content-type': 'multipart/form-data',
        'relica-wallet-encrypted-password': password
      }
    })

  createNFTCollection = async ({ data, password }) =>
    this.post({
      url: `${this.API_PATH}/create-nft-collection`,
      headers: {
        'relica-wallet-encrypted-password': password
      },
      data
    })
    
  getNFTById = async (id, password) =>
    this.get({
      url: `${this.API_PATH}/nft/${id}`,
      headers: {
        'relica-wallet-encrypted-password': password
      }
    })

  sellNFT = async (data, password) =>
    this.post({
      url: `${this.API_PATH}/create-order`,
      headers: {
        'relica-wallet-encrypted-password': password
      },
      data
    })

  buyNFT = async (data, password) =>
    this.put({
      url: `${this.API_PATH}/fill-order`,
      headers: {
        'relica-wallet-encrypted-password': password
      },
      data
    })

  getOrderById = async (orderId) =>
    this.get({
      url: `${this.API_PATH}/order/${orderId}`,
    })
  
  bulkCreateNFT = async (data, password) =>
    this.post({
      url: `${this.API_PATH}/bulk-create-nft`,
      headers: {
        'relica-wallet-encrypted-password': password
      },
      data
    })

  getNFTsByCollection = (page, size, collectionId, password) =>
    this.get({
      url: `${this.API_PATH}/collection/${collectionId}?page=${page}&size=${size}`,
      headers: {
        'relica-wallet-encrypted-password': password
      }
    });

  dropNFT = async (data, password) =>
    this.post({
      url: `${this.API_PATH}/drop-nft`,
      headers: {
        'relica-wallet-encrypted-password': password
      },
      data
    });
}

export default new NftService();

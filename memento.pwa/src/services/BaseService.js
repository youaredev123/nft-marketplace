import Requestor from "../lib/requestor";
import { removeToken } from "../lib/tokenizer";

const requestor = new Requestor();

class BaseService {
  API_PATH = "/api";

  makeRequest = (request) =>
    new Promise((resolve) => {
      request().then((response) => {
        // handle refresh token when and if it gets added
        if (!response.authError) {
          // return response
          resolve(response);
        } else {
          removeToken();
        }
      });
    });

  get = ({ url, headers = {}, params = {} }) =>
    this.makeRequest(() => requestor.get({ url, headers, params }));

  post = ({ url, data = {}, headers = {}, params = {} }) =>
    this.makeRequest(() => requestor.post({ url, data, headers, params }));

  put = ({ url, data = {}, headers = {}, params = {} }) =>
    this.makeRequest(() => requestor.put({ url, data, headers, params }));

  patch = ({ url, data = {}, headers = {}, params = {} }) =>
    this.makeRequest(() => requestor.patch({ url, data, headers, params }));

  delete = ({ url, headers = {}, params = {} }) =>
    this.makeRequest(() => requestor.delete({ url, headers, params }));
}

export default BaseService;

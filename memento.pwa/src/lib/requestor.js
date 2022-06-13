import axios from "axios";
import { fetchToken, removeToken } from "../lib/tokenizer";

const processSuccess = (response) => ({
  data: response.data,
  hasError: false,
  authError: false,
  status: response.status,
  stacktrace: response.config,
  message: null,
  retry: false,
});

const processError = (error) => {
  let message = "";
  let retry = false;
  let status = 500;
  let errors = [];
  let authError = false;
  let url =
    (error.response && error.response?.config && error.response?.config?.url) ||
    "";
  let data = null;
  if (error && error.response) {
    status = error.response.status;
    errors = [];
    data = error.response.data
    message = error.response?.message || error.response?.data?.message || "";

    switch (status) {
      case 401:
        // DANGEROUS: If the API call is not for login then logout the user as they tried to access a protected resource with an invalid token.
        if (!url.includes("login/money-button")) {
          authError = true;
          removeToken();
          // do not change location  <AuthenticatedRoute /> will do it if it can't reauthorise automatically
          //   window.location.href = "/auth";
        }
        break;
      default:
        break;
    }
  }
  const response = {
    status,
    authError,
    hasError: true,
    data,
    errors,
    message,
    stacktrace: null,
    retry,
  };
  return response;
};

export const setupInstance = () => {
  const instance = axios.create({
    timeout: 120000,
    headers: { "Cache-Control": "no-cache" },
  });

  instance.interceptors.response.use(
    (response) => processSuccess(response),
    (error) => processError(error)
  );
  return instance;
};

class Requestor {
  request = null;

  constructor() {
    this.request = setupInstance();
    this.setupAutoHeader();
  }

  setupAutoHeader = () => {
    this.request.interceptors.request.use((config) => {
      if (config.headers.ignoreAuthorization) {
        delete config.headers.ignoreAuthorization;
        return config;
      }
      if (
        !(
          config.headers.Authorization &&
          config.headers.Authorization.length > 0
        )
      ) {
        const token = this.getTokens();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  };

  getTokens = () => {
    const data = fetchToken();
    if (data && data.token && data.token.length) {
      return data.token;
    }
    return null;
  };

  get = ({ url, headers = {}, params = {} }) => {
    return this.request.get(url, {
      headers: { ...headers },
      params,
    });
  };

  post = ({ url, data = {}, headers = {}, params = {} }) => {
    return this.request.post(url, data, {
      headers: { ...headers },
      params,
    });
  };

  put = ({ url, data = {}, headers = {}, params = {} }) => {
    return this.request.put(url, data, {
      headers: { ...headers },
      params,
    });
  };

  patch = ({ url, data = {}, headers = {}, params = {} }) => {
    return this.request.patch(url, data, {
      headers: { ...headers },
      params,
    });
  };

  delete = ({ url, headers = {}, params = {} }) => {
    return this.request.delete(url, {
      headers: { ...headers },
      params,
    });
  };
}

export default Requestor;

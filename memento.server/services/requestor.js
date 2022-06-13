const axios = require("axios");

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
  let data = null;
  if (error && error.response) {
    status = error.response.status;
    errors.push(error);
    data = error.response.data;
    message = (error.response.data && error.response.data.message) || message;
    switch (status) {
      case 401:
        authError = true;
        break;
      default:
        break;
    }
  } else if (error) {
    errors.push(error);
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

const debugFormatData = data => {
  if (data === null) {
    return "null";
  }
  if (typeof data === 'string') {
    return '"' + data.replace('"', '\\"') + '"';
  }
  const cutoffLength = 300;
  var st = JSON.stringify(data);
  if (st.length < cutoffLength) return data;
  if (Array.isArray(data)) {
    st = [];
    for (var i = 0; i < data.length; ++i) {
      const thisFormatted = debugFormatData(data[i]);
      if ([...st, thisFormatted].join(", ").length >= cutoffLength) break;
      st = [...st, thisFormatted];
    }
    return "[" + st.join(", ") + "... ]";
  }
  if (typeof data === "object") {
    if (typeof data.contentIds !== 'undefined') {
      return "{\"contentIds\": " + debugFormatData(data.contentIds) + ", ...}";
    }
    st = [];
    for (const prop in data) {
      const thisFormatted = debugFormatData(prop) + ": " +
        debugFormatData(data[prop]);
      if ([...st, thisFormatted].join(", ").length >= cutoffLength) break;
      st = [...st, thisFormatted];
    }
    return "{" + st.join(", ") + " ...}";
  }
  return "<some stuff>";
}

const requestor = axios.create({
  timeout: 120000,
  headers: { "Cache-Control": "no-cache" },
});

requestor.interceptors.response.use(
  (response) => processSuccess(response),
  (error) => processError(error)
);


module.exports = { requestor, processSuccess, processError, debugFormatData }

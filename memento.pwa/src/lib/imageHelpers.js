/**
 * from https://stackoverflow.com/a/40289667/13179057
 */
export const blobToBase64 = (blob, callback) => {
  var reader = new FileReader();
  reader.onload = function () {
    var dataUrl = reader.result;
    var base64 = dataUrl.split(",")[1];
    callback(base64);
  };
  reader.readAsDataURL(blob);
};

/**
 * from https://stackoverflow.com/a/57272491/13179057
 * @param {file} file
 */
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

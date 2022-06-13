export const unique = (arr) => {
  let result = [];

  for (let str of arr) {
    if (!result.find((el) => el.userId === str.userId)) {
      result.push(str);
    }
  }

  return result;
};

import { differenceInMinutes, getTime } from "date-fns";

export const getUnixTime =
  Date.now ||
  function () {
    return +new Date();
  };

export const checkNeedRefresh = (unixTimestamp, minutes) => {
  // this function checks if unixTimestamp was saved minutes before
  const initial = getTime(unixTimestamp);
  // current time
  const now = getTime(getUnixTime());
  // difference in minutes
  const difference = differenceInMinutes(now, initial);

  // return if it's bigger or not
  return difference > minutes;
};

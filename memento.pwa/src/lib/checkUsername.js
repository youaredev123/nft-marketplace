export default function(username) {
  if (!username || typeof(username) !== "string" || username.length < 3) {
    return "short";
  }
  if (username.length > 20) {
    return "toolong";
  }
  if (username.match(/^[0-9a-zA-Z]+$/) === null) {
    return "invalidchars";
  }
  const forbiddenEndpoints = [
    "favourites",
    "search",
    "post",
    "notifications",
    "profile",
    "settings",
    "static",
    "auth",
    "app",
    "join",
  ];
  if (forbiddenEndpoints.indexOf(username.toLowerCase()) !== -1) {
    return "system";
  }
  return null;
}
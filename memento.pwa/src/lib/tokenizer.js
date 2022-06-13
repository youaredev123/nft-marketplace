import db from "../dbInit";
const tokenKey = "relicaTokenKey";

export const setToken = (token, userId) => {
  if (token && token.length) {
    localStorage.setItem(
      tokenKey,
      JSON.stringify({
        token,
        userId,
      })
    );
  }
};

export const removeToken = () => {
  db.users.clear();
  db.comments.clear();
  db.posts.clear();
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem("feed");
  sessionStorage.removeItem("mostLikedFeed");
  sessionStorage.removeItem("leaderboardFeed");
  sessionStorage.removeItem("incomeList");
  sessionStorage.removeItem("deviceToken");
  sessionStorage.removeItem("users_feed");
  sessionStorage.removeItem("incomeList");
  localStorage.removeItem("relica_activity");
  localStorage.removeItem("relica_unseen");
  localStorage.removeItem("relica_user");
};

export const fetchToken = () => {
  let data = null;
  try {
    data = localStorage.getItem(tokenKey);
    data = JSON.parse(data);
  } catch (e) {
    data = null;
    console.error("Error fetching token from storage", e);
  } finally {
    return data;
  }
};

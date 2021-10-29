export const addTokenToStorage = (token) => {
  localStorage.setItem(
    "Auth",
    JSON.stringify({ isLoggedIn: true, token: token })
  );
};

export const getAuthToken = () =>
  localStorage.getItem("Auth") &&
  JSON.parse(localStorage.getItem("Auth"))["token"];

export const isLoggedInLocaly = () =>
  localStorage.getItem("Auth") &&
  JSON.parse(localStorage.getItem("Auth"))["isLoggedIn"];

export const requireAuth = (callback) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return false;
  }
  callback();
  return true;
};

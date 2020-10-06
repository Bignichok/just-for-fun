export const getLocalStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
export const setLocalStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

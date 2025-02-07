const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Content-Security-Policy": "default-src 'self' *.tripleten-services.com",
};

export const register = (email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

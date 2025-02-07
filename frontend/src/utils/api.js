class API {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method: method,
      headers: this._headers,
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._url}${endpoint}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo(token) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return this._makeRequest("/users/me");
  }

  updateUserInfo(userInfo) {
    return this._makeRequest("/users/me", "PATCH", userInfo);
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  addCard(cardInfo) {
    return this._makeRequest("/cards", "POST", cardInfo);
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, "DELETE");
  }

  changeLikeCardStatus(cardId, status) {
    const method = status ? "PUT" : "DELETE";
    return this._makeRequest(`/cards/${cardId}/likes`, method);
  }

  updateProfileAvatar(avatarLink) {
    return this._makeRequest("/users/me/avatar", "PATCH", avatarLink);
  }
}

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const api = new API({
  baseUrl: API_URL,
  headers: {
    "Content-Security-Policy": "default-src 'self' *.nomoreparties.co",
  },
});
export default api;

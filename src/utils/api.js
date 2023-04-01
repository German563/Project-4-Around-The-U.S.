export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  async getInitialCards() {
    const response = await this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
    return response;
  }

  async getUserData() {
    const response = await this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return response;
  }

  async addCard(name, link) {
    const response = await this._request(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: "" + name + "",
        link: "" + link + "",
      }),
    });
    return response;
  }

  async changeProfile(formValues) {
    const response = await this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.title,
      }),
    });
    return response;
  }

  async changeAvatar(formValues) {
    const response = await this._request(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: formValues.avatar,
      }),
    });
    return response;
  }

  async addLike(cardId) {
    const response = await this._request(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
    return response;
  }

  async disLike(cardId) {
    const response = await this._request(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return response;
  }

  async deleteCard(cardId) {
    const response = await this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return response;
  }
}

import { config } from "./data";

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Произошла ошибка'))
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then(res => this._handleResponse(res))
  }

  createCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._handleResponse(res))
  }

  getOwnerInfo() {
    return fetch(this.url + `/users/me`, {
      method: 'GET',
      headers: this.headers
    })
    .then(res => this._handleResponse(res))
  }

  editProfile(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._handleResponse(res))
  }
  
  editAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
          avatar: data.avatar, 
      })
  })
    .then(res => this._handleResponse(res))
  }

  deleteCard(_id) {
    return fetch(`${this.url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._handleResponse(res))
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this.url}/cards/${_id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this.headers
    })
    .then(res => this._handleResponse(res))
  }
}

const api = new Api(config);

export default api

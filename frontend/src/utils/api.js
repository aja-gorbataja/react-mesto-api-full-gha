const config = {
  url: 'https://api.lastmesto.nomoredomains.rocks'
}

class Api {
  constructor(config) {
    this.url = config.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Произошла ошибка'))
  }

  getCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => this._handleResponse(res))
  }

  createCard({name, link}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, link})
    })
    .then(res => this._handleResponse(res))
  }

  getOwnerInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => this._handleResponse(res))
  }

  editProfile({name, about}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, about})
    })
    .then(res => this._handleResponse(res))
  }
  
  editAvatar({avatar}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({avatar})
  })
    .then(res => this._handleResponse(res))
  }

  deleteCard(_id) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => this._handleResponse(res))
  }

  changeLikeCardStatus(_id, isLiked) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards/${_id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => this._handleResponse(res))
  }
}

const api = new Api(config);

export default api

export const BASE_URL = 'https://api.lastmesto.nomoredomains.rocks';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'))
}

export function register({email, password}) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
    })
    .then(handleResponse)
}

export function authorize({email, password}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
    })
    .then(handleResponse)
}

export function getToken() {
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify()
    })
    .then(handleResponse)
} 
export const BASE_URL = 'http://localhost:3000';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'))
}

export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email: data.email, 
      password: data.password 
    })
    })
    .then(handleResponse)
}

export function authorize(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email: data.email, 
      password: data.password 
    })
    })
    .then(handleResponse)
}

export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify()
    })
    .then(handleResponse)
} 
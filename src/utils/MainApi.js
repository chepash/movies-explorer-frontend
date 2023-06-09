import { MAIN_API_BASE_URL } from './constants';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    const error = {
      status: res.status.toString(),
      message: data.message || `Ошибка: ${res.status}`,
    };
    return Promise.reject(error);
  });
};

export const register = (name, email, password) =>
  fetch(`${MAIN_API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
      email,
    }),
  }).then(getResponse);

export const authorize = (email, password) =>
  fetch(`${MAIN_API_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
    credentials: 'include',
  }).then(getResponse);

export const signOut = () =>
  fetch(`${MAIN_API_BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(getResponse);

export const getUserInfo = () =>
  fetch(`${MAIN_API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(getResponse);

export const sendUserInfo = (userInfo) =>
  fetch(`${MAIN_API_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
    credentials: 'include',
  }).then(getResponse);

export const getSavedCards = () =>
  fetch(`${MAIN_API_BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
  }).then(getResponse);

export const sendCard = (card) =>
  fetch(`${MAIN_API_BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(card),
  }).then(getResponse);

export const sendСardDeleteRequest = (cardId) =>
  fetch(`${MAIN_API_BASE_URL}/movies/${cardId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(getResponse);

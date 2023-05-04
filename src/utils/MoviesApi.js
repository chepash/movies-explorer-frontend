import MOVIES_BASE_URL from './constants';

const getResponse = (res) =>
  res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));

const getMoviesFromServer = () =>
  fetch(`${MOVIES_BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(getResponse);

export default getMoviesFromServer;

import { MOVIES_API_BASE_URL } from './constants';

const getResponse = (res) =>
  res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));

const getMoviesFromServer = () =>
  fetch(`${MOVIES_API_BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(getResponse)
    .then((cards) =>
      cards.map((card) => ({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${MOVIES_API_BASE_URL}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${MOVIES_API_BASE_URL}${
          card.image.formats?.small?.url || card.image.formats?.thumbnail?.url
        }`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }))
    );

export default getMoviesFromServer;

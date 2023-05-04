import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MOVIES_BASE_URL from '../../../utils/constants';

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += `${hours}ч `;
    }

    if (minutes > 0) {
      formattedDuration += `${minutes}м`;
    }

    return formattedDuration;
  };

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="element">
      <div className="element__wrapper">
        <p className="element__title">{card.nameRU}</p>
        <p className="element__duration">{formatDuration(card.duration)}</p>

        {!isSavedMoviesPage && (
          <button
            className={`element__button button button_type_like ${
              isLiked ? 'button_type_like_active' : ''
            }`}
            type="button"
            onClick={handleLikeClick}
          />
        )}
        {isSavedMoviesPage && (
          <button
            className="element__button button button_type_remove"
            type="button"
          />
        )}
      </div>
      <div className="element__image-wrapper">
        <img
          className="element__image"
          src={`${MOVIES_BASE_URL}${
            card.image.formats.small
              ? card.image.formats.small.url
              : card.image.formats.thumbnail.url
          }`}
          alt={`Обложка фильма "${card.nameRU}"`}
        />
      </div>
    </li>
  );
}

export default MoviesCard;

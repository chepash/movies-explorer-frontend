import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import moviePic from '../../../images/movies_pic/4.jpg';

function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="element">
      <div className="element__wrapper">
        <p className="element__title">
          33 слова о дизайнеКиноальманах «100 лет дизайна»Киноальманах «100 лет
          дизайна»Киноальманах «100 лет дизайна»
        </p>
        <p className="element__duration">1ч 42м</p>

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
        <img className="element__image" src={moviePic} alt="Обложка фильма" />
      </div>
    </li>
  );
}

export default MoviesCard;

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesSearchState }) {
  const getCardsToShow = () => (window.innerWidth <= 768 ? 5 : 7);

  // Задание: "Проверяйте ширину устройства при монтировании компонента результатов"
  // надеюсь пойдет такой способ без использования resize event и налепливания setTimeout
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    setCardsToShow(getCardsToShow());
  }, [moviesSearchState.filteredCards]);

  const handleShowMoreCards = () => {
    setCardsToShow(cardsToShow + getCardsToShow());
  };

  let message = null;

  if (moviesSearchState.error) {
    message = (
      <p className="elements__message">
        Во&nbsp;время запроса произошла ошибка. Возможно, проблема
        с&nbsp;соединением или сервер недоступен. Подождите немного
        и&nbsp;попробуйте ещё раз.
      </p>
    );
  } else if (moviesSearchState.filteredCards.length === 0) {
    message = <p className="elements__message">Ничего не найдено</p>;
  }

  return (
    <section className="elements" aria-label="Список фильмов">
      <ul className="elements__list page__list">
        {moviesSearchState.filteredCards.slice(0, cardsToShow).map((card) => (
          <MoviesCard
            key={card.id}
            card={card}
            // onCardClick={onCardClick}
            // onCardLike={onCardLike}
            // onCardDelete={onCardDelete}
            // onDeleteBtnClick={onDeleteBtnClick}
          />
        ))}
      </ul>
      {moviesSearchState.filteredCards.length > cardsToShow && (
        <button
          className="elements__button button button_type_more"
          type="button"
          onClick={handleShowMoreCards}
        >
          Ещё
        </button>
      )}
      {message}
    </section>
  );
}

export default MoviesCardList;

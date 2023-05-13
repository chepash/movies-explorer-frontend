import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  MOBILE_CARDS_TO_SHOW,
  DESKTOP_CARDS_TO_SHOW,
  MAX_MOBILE_WIDTH,
} from '../../../utils/constants';

function MoviesCardList({
  cardsSearchState,
  onCardLike,
  onCardDelete,
  savedCards,
}) {
  const getCardsToShow = () =>
    window.innerWidth <= MAX_MOBILE_WIDTH
      ? MOBILE_CARDS_TO_SHOW
      : DESKTOP_CARDS_TO_SHOW;

  // Задание: "Проверяйте ширину устройства при монтировании компонента результатов"
  // надеюсь пойдет такой способ без использования resize event и налепливания setTimeout
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    setCardsToShow(getCardsToShow());
  }, [cardsSearchState.filteredCards]);

  const handleShowMoreCards = () => {
    setCardsToShow(cardsToShow + getCardsToShow());
  };

  return (
    <section className="elements" aria-label="Список фильмов">
      {!cardsSearchState.error && (
        <ul className="elements__list page__list">
          {cardsSearchState.filteredCards?.slice(0, cardsToShow).map((card) => (
            <MoviesCard
              key={card.movieId}
              card={card}
              savedCards={savedCards}
              // onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      )}
      {cardsSearchState.filteredCards?.length > cardsToShow && (
        <button
          className="elements__button button button_type_more"
          type="button"
          onClick={handleShowMoreCards}
        >
          Ещё
        </button>
      )}
      {cardsSearchState.error && (
        <p className="elements__message">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема
          с&nbsp;соединением или сервер недоступен. Подождите немного
          и&nbsp;попробуйте ещё раз.
        </p>
      )}
      {cardsSearchState.error === '' &&
        cardsSearchState.isSearchPerformed === true &&
        cardsSearchState.searchQueryText === '' && (
          <p className="elements__message">Нужно ввести ключевое слово</p>
        )}
      {cardsSearchState.error === '' &&
        cardsSearchState.isSearchPerformed === true &&
        cardsSearchState.searchQueryText !== '' &&
        cardsSearchState.filteredCards.length === 0 && (
          <p className="elements__message">Ничего не найдено</p>
        )}
    </section>
  );
}

export default MoviesCardList;

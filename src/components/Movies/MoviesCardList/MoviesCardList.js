import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesSearchState }) {
  const [cardsToShow, setCardsToShow] = useState(7);

  const handleShowMoreCards = () => {
    setCardsToShow(cardsToShow + 7);
  };

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
    </section>
  );
}

export default MoviesCardList;

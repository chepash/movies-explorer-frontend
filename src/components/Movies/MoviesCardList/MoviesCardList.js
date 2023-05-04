import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ filteredCards }) {
  return (
    <section className="elements" aria-label="Список фильмов">
      <ul className="elements__list page__list">
        {filteredCards.map((card) => (
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
      <button
        className="elements__button button button_type_more"
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

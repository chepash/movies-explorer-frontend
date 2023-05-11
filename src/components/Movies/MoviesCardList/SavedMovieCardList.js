import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMoviesCardList({
  savedCardsSearchState,
  onCardLike,
  onCardDelete,
  savedCards,
}) {
  return (
    <section className="elements" aria-label="Список фильмов">
      {!savedCardsSearchState.error && (
        <ul className="elements__list page__list">
          {savedCardsSearchState.filteredCards.map((card) => (
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
      {savedCardsSearchState.error && (
        <p className="elements__message">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема
          с&nbsp;соединением или сервер недоступен. Подождите немного
          и&nbsp;попробуйте ещё раз.
        </p>
      )}
      {!savedCardsSearchState.error &&
        savedCardsSearchState.isSearchPerformed === true &&
        savedCardsSearchState.filteredCards.length === 0 && (
          <p className="elements__message">Ничего не найдено</p>
        )}
    </section>
  );
}

export default SavedMoviesCardList;

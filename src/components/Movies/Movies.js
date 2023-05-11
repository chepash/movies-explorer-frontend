import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  onSearchFormSubmit,
  cardsSearchState,
  handleToggleCheckbox,
  isLoading,
  onCardLike,
  savedCards,
}) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        cardsSearchState={cardsSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
        handleToggleCheckbox={handleToggleCheckbox}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          savedCards={savedCards}
          cardsSearchState={cardsSearchState}
          onCardLike={onCardLike}
        />
      )}
    </main>
  );
}

export default Movies;

import SearchForm from './SearchForm/SearchForm';
import SavedMovieCardList from './MoviesCardList/SavedMovieCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  onSearchFormSubmit,
  handleToggleCheckbox,
  savedCardsSearchState,
  isLoading,
  onCardDelete,
}) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        cardsSearchState={savedCardsSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
        handleToggleCheckbox={handleToggleCheckbox}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <SavedMovieCardList
          savedCardsSearchState={savedCardsSearchState}
          onCardDelete={onCardDelete}
        />
      )}
    </main>
  );
}

export default SavedMovies;

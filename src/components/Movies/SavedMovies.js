import { useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import SavedMovieCardList from './MoviesCardList/SavedMovieCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  onSearchFormSubmit,
  handleToggleCheckbox,
  savedCardsSearchState,
  setSavedCardsSearchState,
  savedCards,
  isLoading,
  onCardDelete,
}) {
  useEffect(() => {
    setSavedCardsSearchState({
      searchQueryText: '',
      filteredCards: savedCards,
      isToggleChecked: false,
      isSearchPerformed: false,
      error: '',
    });
  }, []);

  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        cardsSearchState={savedCardsSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
        handleToggleCheckbox={handleToggleCheckbox}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <SavedMovieCardList
          savedCards={savedCards}
          savedCardsSearchState={savedCardsSearchState}
          onCardDelete={onCardDelete}
        />
      )}
    </main>
  );
}

export default SavedMovies;

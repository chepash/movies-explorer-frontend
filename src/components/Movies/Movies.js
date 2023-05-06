import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  onSearchFormSubmit,
  moviesSearchState,
  handleToggleCheckbox,
  isLoading,
}) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        moviesSearchState={moviesSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
        handleToggleCheckbox={handleToggleCheckbox}
      />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList moviesSearchState={moviesSearchState} />}
    </main>
  );
}

export default Movies;

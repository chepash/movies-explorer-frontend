import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({
  onSearchFormSubmit,
  moviesSearchState,
  handleToggleCheckbox,
}) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        moviesSearchState={moviesSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
        handleToggleCheckbox={handleToggleCheckbox}
      />
      <MoviesCardList moviesSearchState={moviesSearchState} />
    </main>
  );
}

export default Movies;

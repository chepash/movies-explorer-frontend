import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ onSearchFormSubmit, moviesSearchState }) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm
        moviesSearchState={moviesSearchState}
        onSearchFormSubmit={onSearchFormSubmit}
      />
      <MoviesCardList moviesSearchState={moviesSearchState} />
    </main>
  );
}

export default Movies;

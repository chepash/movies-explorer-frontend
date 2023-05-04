import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ onSearchFormSubmit, filteredCards }) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm onSearchFormSubmit={onSearchFormSubmit} />
      <MoviesCardList filteredCards={filteredCards} />
    </main>
  );
}

export default Movies;

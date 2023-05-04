import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ onSearchFormSubmit, cards }) {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm onSearchFormSubmit={onSearchFormSubmit} />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default Movies;

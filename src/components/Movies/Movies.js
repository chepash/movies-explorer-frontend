import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className="movies page__container page__container_wide">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;

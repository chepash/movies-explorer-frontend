import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="elements" aria-label="Список фильмов">
      <ul className="elements__list page__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className="elements__button button button_type_more"
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

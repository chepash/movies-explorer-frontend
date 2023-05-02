function SearchForm() {
  return (
    <section className="search-form" aria-label="Поиск и фильтрация фильмов">
      <form className="search-form__container">
        <div className="search-form__input-bar" />

        <div className="search-form__icon" />

        <div className="search-form__input-wrapper">
          <input className="search-form__input" />
        </div>

        <button
          className="search-form__button button button_type_search"
          type="submit"
        />

        <div className="search-form__filter">
          <input
            id="toggle"
            type="checkbox"
            className="search-form__toggle"
            required
          />
          <label htmlFor="toggle" className="search-form__toggle-label">
            <span className="search-form__toggle-knob" />
          </label>
          <span className="search-form__filter-name">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

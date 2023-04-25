function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <div className="search-form__input-bar" />

        <div className="search-form__icon" />

        <input
          className="search-form__input"
          value="Some movie Some movie Some movie Some movie Some movie Some movie Some movie Some movie"
        />

        <button className="search-form__button button" type="submit" />

        <div className="search-form__filter">
          <input id="toggle" type="checkbox" className="search-form__toggle" />
          <label htmlFor="toggle" className="search-form__toggle-label">
            <div className="search-form__toggle-knob" />
          </label>
          <span className="search-form__filter-name">Короткометражки</span>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;

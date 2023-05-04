import { useState } from 'react';

import ToggleButton from '../../_UI_elements/ToggleButton/ToggleButton';

function SearchForm({ onSearchFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSearchFormSubmit(searchQuery);
  }

  return (
    <section className="search-form" aria-label="Поиск и фильтрация фильмов">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <div className="search-form__input-bar" />

        <div className="search-form__icon" />

        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          className="search-form__button button button_type_search"
          type="submit"
        />

        <div className="search-form__filter">
          <ToggleButton />
          <span className="search-form__filter-name">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

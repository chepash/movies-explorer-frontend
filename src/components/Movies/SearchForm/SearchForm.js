import { useState } from 'react';

import ToggleButton from '../../_UI_elements/ToggleButton/ToggleButton';

function SearchForm({
  cardsSearchState,
  onSearchFormSubmit,
  handleToggleCheckbox,
  isLoading,
}) {
  const [searchQueryText, setSearchQueryText] = useState(
    cardsSearchState.searchQueryText
  );
  const [isToggleChecked, setToggleChecked] = useState(
    cardsSearchState.isToggleChecked
  );

  function handleInputChange(e) {
    setSearchQueryText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSearchFormSubmit(searchQueryText, isToggleChecked);
  }

  return (
    <section className="search-form" aria-label="Поиск и фильтрация фильмов">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <div className="search-form__input-bar" />
        <div className="search-form__icon" />

        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            value={searchQueryText || ''}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <button
          className="search-form__button button button_type_search"
          type="submit"
          disabled={isLoading}
        />

        <div className="search-form__filter">
          <ToggleButton
            isToggleChecked={isToggleChecked}
            setToggleChecked={setToggleChecked}
            handleToggleCheckbox={handleToggleCheckbox}
            cardsSearchState={cardsSearchState}
            isLoading={isLoading}
          />
          <span className="search-form__filter-name">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

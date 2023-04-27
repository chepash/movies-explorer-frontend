import { NavLink } from 'react-router-dom';

function Navigation({ loggedIn, onAccountBtnClick }) {
  return (
    <>
      {!loggedIn && (
        <nav className="nav">
          <NavLink
            className="page__link nav__link nav__link_type_sign-up"
            to="/signup"
          >
            Регистрация
          </NavLink>
          <button
            type="button"
            className="button nav__button button_type_sign-in"
          >
            Войти
          </button>
        </nav>
      )}

      {loggedIn && (
        <nav className="nav nav_hidden">
          <div className="nav__wrapper">
            <NavLink
              className={({ isActive }) =>
                `page__link nav__link nav__link_type_movies${
                  isActive ? ' nav__link_active' : ''
                }`
              }
              to="/movies"
            >
              Фильмы
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `page__link nav__link nav__link_type_saved-movies${
                  isActive ? ' nav__link_active' : ''
                }`
              }
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </div>

          <button
            type="button"
            onClick={onAccountBtnClick}
            className="button nav__button button_type_account"
          >
            Аккаунт
          </button>
        </nav>
      )}
    </>
  );
}

export default Navigation;

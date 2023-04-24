// import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header header_background_cyan">
      <div className="header__container page__container">
        <div to="/" alt="Логотип" className="header__logo" />
        <nav className="navbar">
          <button
            type="button"
            className="button navbar__link page__link navbar__link_type_sign-up"
          >
            Регистрация
          </button>
          <button
            type="button"
            className="button navbar__button button_type_sign-in"
          >
            Войти
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

import { NavLink } from 'react-router-dom';

function MobileMenu({ onAccountBtnClick, onNavLinkClick }) {
  return (
    <nav className="mobile-menu">
      <div className="mobile-menu__container">
        <ul className="mobile-menu__list page__list">
          <li className="mobile-menu__item">
            <NavLink
              className={({ isActive }) =>
                `page__link mobile-menu__link ${
                  isActive ? ' mobile-menu__link_active' : ''
                }`
              }
              to="/"
              onClick={onNavLinkClick}
            >
              Главная
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <NavLink
              className={({ isActive }) =>
                `page__link mobile-menu__link${
                  isActive ? ' mobile-menu__link_active' : ''
                }`
              }
              to="/movies"
              onClick={onNavLinkClick}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <NavLink
              className={({ isActive }) =>
                `page__link mobile-menu__link${
                  isActive ? ' mobile-menu__link_active' : ''
                }`
              }
              to="/saved-movies"
              onClick={onNavLinkClick}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <button
              type="button"
              onClick={onAccountBtnClick}
              className="button button_type_account"
            >
              Аккаунт
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MobileMenu;

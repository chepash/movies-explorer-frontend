import { useLocation, NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header${isHomePage ? ' header_background_cyan' : ''}`}>
      <div className="header__container page__container">
        <NavLink className="header__logo" to="/" alt="Логотип" />

        <Navigation />
      </div>
    </header>
  );
}

export default Header;

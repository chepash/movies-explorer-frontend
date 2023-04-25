import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header${isHomePage ? ' header_background_cyan' : ''}`}>
      <div className="header__container page__container">
        <div to="/" alt="Логотип" className="header__logo" />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

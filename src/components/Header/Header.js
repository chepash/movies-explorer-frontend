// import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header header_background_cyan">
      <div className="header__container page__container">
        <div to="/" alt="Логотип" className="header__logo" />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

import { useLocation } from 'react-router-dom';
import logoImage from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onLogoClick, onAccountBtnClick }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header${isHomePage ? ' header_background_cyan' : ''}`}>
      <div className="header__container page__container">
        <img
          src={logoImage}
          onClick={onLogoClick}
          className="header__logo"
          to="/"
          alt="Логотип"
          title="Вернуться на главную"
        />
        <Navigation onAccountBtnClick={onAccountBtnClick} loggedIn={loggedIn} />
      </div>
    </header>
  );
}

export default Header;

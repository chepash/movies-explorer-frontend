import { useLocation } from 'react-router-dom';
import logoImage from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({
  loggedIn,
  onLogoClick,
  onAccountBtnClick,
  onSignInBtnClick,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/signup', '/signin'].includes(location.pathname);

  // заглушка вместо протектед роутс. тут navigation обязан быть в состоянии loggedIn = true
  const isProtectedRoute = ['/profile', '/movies', '/saved-movies'].includes(
    location.pathname
  );

  return (
    <>
      {!isAuthPage && (
        <header
          className={`header${isHomePage ? ' header_background_cyan' : ''}`}
        >
          <div className="header__container page__container">
            <img
              src={logoImage}
              onClick={onLogoClick}
              className="header__logo"
              alt="Логотип"
              title="Вернуться на главную"
            />
            <Navigation
              onSignInBtnClick={onSignInBtnClick}
              onAccountBtnClick={onAccountBtnClick}
              loggedIn={loggedIn || isProtectedRoute} // заглушка логина
            />
          </div>
        </header>
      )}
      {isAuthPage && (
        <header className="header">
          <div className="header__container header__container_auth">
            <img
              src={logoImage}
              onClick={onLogoClick}
              className="header__logo header__logo_auth"
              alt="Логотип"
              title="Вернуться на главную"
            />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;

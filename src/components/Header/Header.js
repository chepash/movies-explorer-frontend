import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header${isHomePage ? ' header_background_cyan' : ''}`}>
      <div className="header__container page__container">
        <img
          src={logoImage}
          onClick={() => navigate('/')}
          className="header__logo"
          to="/"
          alt="Логотип"
          title="Вернуться на главную"
        />
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  );
}

export default Header;

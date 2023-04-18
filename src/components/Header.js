import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header header_background_cyan">
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />
      </div>
    </header>
  );
}

export default Header;

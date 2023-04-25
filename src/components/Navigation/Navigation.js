function Navigation() {
  return (
    <nav className="navigation">
      <button
        type="button"
        className="button navigation__link page__link navigation__link_type_sign-up"
      >
        Регистрация
      </button>
      <button
        type="button"
        className="button navigation__button button_type_sign-in"
      >
        Войти
      </button>
    </nav>
  );
}

export default Navigation;

import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';

function Login() {
  return (
    <main className="login">
      <h1 className="login__title">Рады видеть!</h1>
      <form className="form">
        <div className="form__wrap">
          <ul className="form__list page__list">
            <li className="form__item">
              <Input type="text" label="E-mail" value="pochta@yandex.ru" />
            </li>
            <li className="form__item">
              <Input type="password" label="Пароль" value="password" />
            </li>
          </ul>
          <span className="form__error">Невидимая ошибка...</span>
        </div>

        <div className="form__controls">
          <button
            className="form__button button button_type_auth"
            type="submit"
          >
            Войти
          </button>
          <div className="form__link-wrapper">
            <span className="form__link-text">Ещё не зарегистрированы?</span>
            <NavLink className="page__link form__link" to="/signup">
              Регистрация
            </NavLink>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;

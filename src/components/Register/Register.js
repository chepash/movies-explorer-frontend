import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';

function Register() {
  return (
    <main className="register">
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="form">
        <div className="form__wrap">
          <ul className="form__list page__list">
            <li className="form__item">
              <Input type="text" label="Имя" value="Павел" />
            </li>
            <li className="form__item">
              <Input type="text" label="E-mail" value="pochta@yandex.ru" />
            </li>
            <li className="form__item">
              <Input
                error="someError" // тестовая верстка
                type="password"
                label="Пароль"
                value="password"
              />
            </li>
          </ul>
          <span className="form__error form__error_visible">
            Что-то пошло не так...
          </span>
        </div>

        <div className="form__controls">
          <button
            className="form__button button button_type_auth"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <div className="form__link-wrapper">
            <span className="form__link-text">Уже зарегистрированы?</span>
            <NavLink className="page__link form__link" to="/signin">
              Войти
            </NavLink>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Register;

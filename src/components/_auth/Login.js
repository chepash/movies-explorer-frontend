import { NavLink } from 'react-router-dom';
import Input from '../_UI_elements/Input';

import useFormWithValidation from '../../utils/hooks/useFormWithValidation';

function Login() {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    resetForm();
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrap">
          <ul className="form__list page__list">
            <li className="form__item">
              <Input
                type="email"
                label="E-mail"
                placeholder="E-mail"
                name="email"
                onChange={handleChange}
                value={values.email || 'pochta@yandex.ru'}
                error={errors.email}
                minLength="2"
                maxLength="40"
                required
              />
            </li>
            <li className="form__item">
              <Input
                type="password"
                label="Пароль"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                value={values.password || ''}
                error={errors.password}
                minLength="2"
                maxLength="200"
                required
              />
            </li>
          </ul>
          <ul className="form__errors-list page__list">
            <li
              className={`form__error${!isValid ? ' form__error_visible' : ''}`}
            >
              {errors.email ? `Поле Email: ${errors.email}` : ''}
            </li>
            <li
              className={`form__error${!isValid ? ' form__error_visible' : ''}`}
            >
              {errors.password ? `Поле Пароль: ${errors.password}` : ''}
            </li>
          </ul>
        </div>

        <div className="form__controls">
          <button
            className={`button button_type_auth form__button ${
              !isValid ? 'form__button_disabled' : ''
            }`}
            type="submit"
            disabled={!isValid}
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

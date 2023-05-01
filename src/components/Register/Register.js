import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';

import useFormWithValidation from '../../utils/hooks/useFormWithValidation';

function Register() {
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
    <main className="register">
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrap">
          <ul className="form__list page__list">
            <li className="form__item">
              <Input
                type="text"
                label="Имя"
                placeholder="Имя"
                name="name"
                onChange={handleChange}
                value={values.name || 'Павел'}
                error={errors.name}
                minLength="2"
                maxLength="40"
                required
              />
            </li>
            <li className="form__item">
              <Input
                type="email"
                label="email"
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
              {errors.name ? `Поле Имя: ${errors.name}` : ''}
            </li>
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

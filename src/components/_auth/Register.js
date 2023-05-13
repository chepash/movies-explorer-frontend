import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  CONFLICT_STATUS_CODE,
  MIN_FIELD_LENGTH,
  MAX_FIELD_NAME_LENGTH,
  MAX_FIELD_EMAIL_LENGTH,
  MAX_FIELD_PASSWORD_LENGTH,
} from '../../utils/constants';

import AuthFormInput from '../_UI_elements/AuthFormInput';

import useFormWithValidation from '../../utils/hooks/useFormWithValidation';

function Register({
  handleRegister,
  authError,
  setAuthError,
  isLoggedIn,
  isLoading,
}) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    setAuthError({ status: '', message: '' });

    if (isLoggedIn) {
      navigate('/movies', { replace: true });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    handleRegister(values, resetForm);
  }

  let regErrorMessage = '';
  if (authError.status === CONFLICT_STATUS_CODE) {
    regErrorMessage = 'Пользователь с таким E-mail уже зарезистрирован.';
  } else {
    regErrorMessage = 'Что-то пошло не так.';
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrap">
          <ul className="form__list page__list">
            <li className="form__item">
              <AuthFormInput
                type="text"
                label="Имя"
                placeholder="Имя"
                name="name"
                onChange={handleChange}
                value={values.name || ''}
                error={errors.name}
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_NAME_LENGTH}
                disabled={isLoading}
                required
              />
            </li>
            <li className="form__item">
              <AuthFormInput
                type="email"
                label="E&#x2011;mail"
                placeholder="E-mail"
                name="email"
                onChange={handleChange}
                value={values.email || ''}
                error={errors.email}
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_EMAIL_LENGTH}
                disabled={isLoading}
                required
              />
            </li>
            <li className="form__item">
              <AuthFormInput
                type="password"
                label="Пароль"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                value={values.password || ''}
                error={errors.password}
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_PASSWORD_LENGTH}
                disabled={isLoading}
                required
              />
            </li>
          </ul>
          <ul className="form__errors-list page__list">
            <li className="form__error-item">
              <div
                className={`form__error${
                  !isValid ? ' form__error_visible' : ''
                }`}
              >
                {errors.name ? `Поле Имя: ${errors.name}` : ''}
              </div>
            </li>
            <li className="form__error-item">
              <div
                className={`form__error${
                  !isValid ? ' form__error_visible' : ''
                }`}
              >
                {errors.email ? `Поле E-mail: ${errors.email}` : ''}
              </div>
            </li>
            <li className="form__error-item">
              <div
                className={`form__error${
                  !isValid ? ' form__error_visible' : ''
                }`}
              >
                {errors.password ? `Поле Пароль: ${errors.password}` : ''}
              </div>
            </li>
          </ul>
        </div>

        <div className="form__controls">
          <div
            className={`form__error form__error_center${
              authError.status ? ' form__error_visible' : ''
            }`}
          >
            {regErrorMessage}
          </div>
          <button
            className={`button button_type_auth form__button ${
              !isValid || isLoading ? 'form__button_disabled' : ''
            }`}
            type="submit"
            disabled={!isValid || isLoading}
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

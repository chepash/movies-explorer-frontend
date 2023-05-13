import { useEffect, useContext } from 'react';
import {
  MIN_FIELD_LENGTH,
  MAX_FIELD_NAME_LENGTH,
  MAX_FIELD_EMAIL_LENGTH,
} from '../../utils/constants';
import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import AuthFormInput from '../_UI_elements/AuthFormInput';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, authError, setAuthError, handleEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    setAuthError({ status: '', message: '' });
  }, []);

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }
    console.log('values : ', values);
    handleEditProfile(values);
  }

  return (
    <main className="auth auth_type_profile">
      <h1 className="auth__title auth__title_type_profile">
        Привет, {currentUser.name}!
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrap">
          <ul className="page__list form__list form__list_type_profile">
            <li className="form__item form__item_type_profile">
              <AuthFormInput
                type="text"
                label="Имя"
                placeholder="Имя"
                name="name"
                onChange={handleChange}
                value={values.name || currentUser.name}
                error={errors.name}
                additionalClassName="type_profile"
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_NAME_LENGTH}
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
                value={values.email || currentUser.email}
                error={errors.email}
                additionalClassName="type_profile"
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_EMAIL_LENGTH}
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
          </ul>
        </div>

        <div className="form__controls form__controls_type_profile">
          <div
            className={`form__error form__error_center${
              authError.status ? ' form__error_visible' : ''
            }`}
          >
            Что-то пошло не так.
          </div>
          <button
            className={`button button_type_edit ${
              !isValid ? 'button_type_edit_disabled' : ''
            }`}
            type="submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
          <div className="form__link-wrapper">
            <button
              className="button button_type_logout"
              type="button"
              onClick={onSignOut}
            >
              Выйти&nbsp;из&nbsp;аккаунта
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Profile;

import { useState, useEffect, useContext } from 'react';
import {
  MIN_FIELD_LENGTH,
  MAX_FIELD_NAME_LENGTH,
  MAX_FIELD_EMAIL_LENGTH,
} from '../../utils/constants';
import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import AuthFormInput from '../_UI_elements/AuthFormInput';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({
  onSignOut,
  authError,
  setAuthError,
  handleEditProfile,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const isFormUnchanged =
    values.name === currentUser.name && values.email === currentUser.email;
  const isSubmitDisabled = !isValid || isFormUnchanged || isLoading;

  const [isSuccess, setIsSuccess] = useState(false);

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

    handleEditProfile(values, setIsSuccess);
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
                onChange={(e) => {
                  handleChange(e);
                }}
                value={values.name || currentUser.name}
                error={errors.name}
                additionalClassName="type_profile"
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
                onChange={(e) => {
                  handleChange(e);
                }}
                value={values.email || currentUser.email}
                error={errors.email}
                additionalClassName="type_profile"
                minLength={MIN_FIELD_LENGTH}
                maxLength={MAX_FIELD_EMAIL_LENGTH}
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
          </ul>
        </div>

        <div className="form__controls form__controls_type_profile">
          <div
            className={`form__message
            ${isSuccess ? ' form__message_visible_success' : ''}
            ${authError.status ? ' form__message_visible_fail' : ''}`}
          >
            {isSuccess && 'Изменения успешно сохранены'}
            {authError.status && 'Что-то пошло не так'}
          </div>
          <button
            className={`button button_type_edit ${
              isSubmitDisabled ? 'button_type_edit_disabled' : ''
            }`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Редактировать
          </button>
          <div className="form__link-wrapper">
            <button
              className="button button_type_logout"
              type="button"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Profile;

function Profile({ onSignOut }) {
  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Павел!</h1>
        <ul className="profile__list page__list">
          <li className="profile__item">
            <span className="profile__label">Имя</span>
            <span className="profile__value">Павел</span>
          </li>
          <li className="profile__item">
            <span className="profile__label">E-mail</span>
            <span className="profile__value">somemail@yandex.ru</span>
          </li>
        </ul>
      </div>

      <div className="profile__buttons-wrapper">
        <button
          className="profile__button button button_type_edit"
          type="button"
        >
          Редактировать
        </button>
        <button
          className="profile__button button button_type_logout"
          type="button"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;

function Login({ onGoBackClick }) {
  return (
    <main className="error-page">
      <h1 className="error-page__title">404</h1>
      <h2 className="error-page__subtitle">Страница не найдена</h2>

      <button
        type="button"
        className="button error-page__button"
        onClick={onGoBackClick}
      >
        Назад
      </button>
    </main>
  );
}

export default Login;

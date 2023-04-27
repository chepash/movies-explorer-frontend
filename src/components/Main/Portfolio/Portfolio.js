function Portfolio() {
  return (
    <section className="portfolio" aria-label="Ссылки на другие проекты">
      <div className="portfolio__container page__container page__container_narrow">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list page__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link page__link"
              href="https://chepash.github.io/how-to-learn/"
            >
              <p className="portfolio__link-name">Статичный сайт</p>
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link page__link"
              href="https://chepash.github.io/russian-travel/"
            >
              <p className="portfolio__link-name">Адаптивный сайт</p>
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link page__link"
              href="https://chepash.github.io/mesto-react/"
            >
              <p className="portfolio__link-name">Одностраничное приложение</p>
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;

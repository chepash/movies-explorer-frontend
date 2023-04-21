function Portfolio() {
  return (
    <section className="portfolio" aria-label="Ссылки на другие проекты">
      <div className="portfolio__container">
        <ul className="about-me__projects">
          <li className="about-me__project">
            <a
              className="about-me__link"
              href="https://github.com/chepash/react-native-starter-kit"
            >
              Статичный сайт ↗
            </a>
          </li>
          <li className="about-me__project">
            <a
              className="about-me__link"
              href="https://github.com/chepash/react-native-starter-kit"
            >
              Адаптивный сайт ↗
            </a>
          </li>
          <li className="about-me__project">
            <a
              className="about-me__link"
              href="https://github.com/chepash/react-native-starter-kit"
            >
              Одностраничное приложение ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;

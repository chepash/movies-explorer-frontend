function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container page__container page__container_narrow">
        <h2 className="about-project__title page__title">О проекте</h2>

        <ul className="about-project__list page__list">
          <li className="about-project__item">
            <h3 className="about-project__heading">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и&nbsp;финальные доработки.
            </p>
          </li>
          <li className="about-project__item">
            <h3 className="about-project__heading">
              На&nbsp;выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
              нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>

        <ul className="about-project__timeline page__list">
          <li className="about-project__timeframe">
            <p className="about-project__label about-project__label_color_green">
              1 неделя
            </p>
            <p className="about-project__caption">Back-end</p>
          </li>
          <li className="about-project__timeframe">
            <p className="about-project__label about-project__label_color_gray">
              4 недели
            </p>
            <p className="about-project__caption">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;

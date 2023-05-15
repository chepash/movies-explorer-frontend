function Techs() {
  return (
    <section
      className="techs"
      aria-label="Информация об используемых технологиях"
    >
      <div className="techs__container page__container page__container_narrow">
        <h2 className="techs__title page__title">Технологии</h2>
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list page__list">
          <li className="techs__icon">HTML</li>
          <li className="techs__icon">CSS</li>
          <li className="techs__icon">SASS</li>
          <li className="techs__icon">JS</li>
          <li className="techs__icon">React</li>
          <li className="techs__icon">Git</li>
          <li className="techs__icon">Express.js</li>
          <li className="techs__icon">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;

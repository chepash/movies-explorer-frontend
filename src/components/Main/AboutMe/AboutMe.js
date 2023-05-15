import profilePhoto from '../../../images/profile_photo.jpg';

function AboutMe() {
  function calculateAge(birthday) {
    const ageDifference = new Date(Date.now() - birthday);
    const ageYears = Math.abs(ageDifference.getUTCFullYear() - 1970);
    let ageText = `${ageYears} лет`;
    const lastDigit = ageYears % 10;
    if (lastDigit === 1 && ageYears !== 11) {
      ageText = `${ageYears} год`;
    } else if (
      (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
      ageYears !== 12 &&
      ageYears !== 13 &&
      ageYears !== 14
    ) {
      ageText = `${ageYears} года`;
    }
    return ageText;
  }

  return (
    <section className="about-me" aria-label="Информация о студенте">
      <div className="about-me__container page__container page__container_narrow">
        <h2 className="about-me__title page__title">Студент</h2>

        <div className="about-me__student">
          <div className="about-me__info">
            <h3 className="about-me__name">Павел</h3>
            <h3 className="about-me__occupation">
              Системный администратор, {calculateAge(new Date(1990, 8, 11))}
            </h3>
            <p className="about-me__description">
              Я&nbsp;родился в&nbsp;городе Владивосток, закончил факультет
              радиоэлектроники и&nbsp;приборостроения ДВФУ. В&nbsp;2012 году
              перехал в&nbsp;Санкт-Петербург и&nbsp;с&nbsp;тех пор работаю
              системным администратором в&nbsp;компании ООО ФАВОР-ГАРАНТ.
              В&nbsp;2022 начал проходить курсы по&nbsp;веб-разработке
              в&nbsp;онлайн школе Яндекс Практикума. Так&nbsp;же в&nbsp;2022 был
              вынужден переехать в&nbsp;Грузию. С&nbsp;тех пор работю удалённо.
              Продолжение&nbsp;следует...
            </p>

            <a
              href="https://github.com/chepash"
              className="about-me__link page__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
          <div className="about-me__image-container">
            <img
              className="about-me__image"
              src={profilePhoto}
              alt="Фотография студента"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

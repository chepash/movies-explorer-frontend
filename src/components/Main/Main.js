import promoImage from '../../images/promo__image.svg';

function Main() {
  return (
    <main className="main">
      <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button
            type="button"
            className="button promo__button button_type_anchor"
          >
            Узнать больше
          </button>
          <img
            className="promo__image"
            src={promoImage}
            alt="Изображение планеты"
          />
        </div>
      </section>

      <section className="about-project">
        <div className="about-project__container">
          <img
            className="promo__image"
            src={promoImage}
            alt="Изображение планеты"
          />
        </div>
      </section>

      <section className="techs">
        <div className="techs__container">
          <img
            className="promo__image"
            src={promoImage}
            alt="Изображение планеты"
          />
        </div>
      </section>
    </main>
  );
}

export default Main;

import promoImage from '../../../images/promo__image.svg';

function Promo({ onAnchorBtnClick }) {
  return (
    <section className="promo" aria-label="Заглавная">
      <div className="promo__container page__container page__container_narrow">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button
          type="button"
          className="button promo__button button_type_anchor"
          onClick={onAnchorBtnClick}
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
  );
}

export default Promo;

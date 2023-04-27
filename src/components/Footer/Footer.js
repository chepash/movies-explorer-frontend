import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isHidden = ['/profile', '/signin', '/signup'].includes(
    location.pathname
  );

  return (
    <footer className={`footer${isHidden ? ' footer_hidden' : ''}`}>
      <div className="footer__container page__container page__container_wide">
        <h2 className="footer__heading">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__wrapper">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <ul className="footer__list page__list">
            <li className="footer__item">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link page__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/chepash/movies-explorer-frontend"
                className="footer__link page__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

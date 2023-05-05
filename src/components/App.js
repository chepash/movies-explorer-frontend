import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import Profile from './Profile/Profile';
import Register from './_auth/Register';
import Login from './_auth/Login';
import NotFound from './NotFound/NotFound';

import Preloader from './Preloader/Preloader';

import Footer from './Footer/Footer';
import MobileMenu from './_UI_elements/MobileMenu/MobileMenu';
import HamburgerButton from './_UI_elements/HamburgerButton/HamburgerButton';

import getMoviesFromServer from '../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHeaderHidden = location.pathname === '/error';
  const isFooterHidden = ['/profile', '/signin', '/signup', '/error'].includes(
    location.pathname
  );
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);
  const isProtectedRoute = ['/profile', '/movies', '/saved-movies'].includes(
    location.pathname
  );
  const isMainRoute = location.pathname === '/';

  const [loggedIn, setLoggedIn] = useState(true);
  // const [isMobileView, setIsMobileView] = useState(false);

  const [moviesSearchState, setMoviesSearchState] = useState(() => {
    const lastMoviesSearchState = JSON.parse(
      localStorage.getItem('moviesSearchState')
    );
    return (
      lastMoviesSearchState || {
        searchQueryText: '',
        filteredCards: [],
        isToggleChecked: false,
        error: '',
      }
    );
  });

  // Временная функция для переключения между состояниями loggedIn при нажатии L
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyL' || event.code === 'KeyД') {
        setLoggedIn(!loggedIn);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [loggedIn]);

  function handleGoBack() {
    navigate(-1);
  }

  function handleNavigateToMain() {
    navigate('/');
  }

  function handleNavigateToProfile() {
    navigate('/profile');
  }

  function handleNavigateToSignIn() {
    navigate('/signin');
  }

  function scrollToSection() {
    const section = document.querySelector(`.about-project`);

    if (section !== null) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  function updateLocalStorage(key, newData) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      localStorage.setItem(key, JSON.stringify({ ...data, ...newData }));
    } else {
      localStorage.setItem(key, JSON.stringify({ ...newData }));
    }
  }

  function filterCards() {
    try {
      const cards = JSON.parse(localStorage.getItem('allCards'));
      const { searchQueryText, isToggleChecked } = JSON.parse(
        localStorage.getItem('moviesSearchState')
      );

      const filteredCards = cards.filter((card) => {
        const nameRU = card.nameRU ? card.nameRU.toLowerCase() : '';

        if (isToggleChecked && card.duration > 40) {
          return false;
        }

        return nameRU.toLowerCase().includes(searchQueryText.toLowerCase());
      });

      updateLocalStorage('moviesSearchState', { filteredCards, error: '' });

      setMoviesSearchState({
        ...moviesSearchState,
        searchQueryText,
        isToggleChecked,
        filteredCards,
        error: '',
      });
    } catch (err) {
      console.log(`Ошибка filterCards: ${err}`);

      setMoviesSearchState({
        ...moviesSearchState,
        error: err,
      });
    }
  }

  function handleToggleCheckbox(isToggleChecked) {
    updateLocalStorage('moviesSearchState', { isToggleChecked });

    filterCards();
  }

  function handleSearchFormSubmit(searchQueryText) {
    const allCards = JSON.parse(localStorage.getItem('allCards'));

    updateLocalStorage('moviesSearchState', { searchQueryText });

    if (allCards) {
      filterCards();
    } else {
      getMoviesFromServer()
        .then((allCardsFromServer) => {
          localStorage.setItem('allCards', JSON.stringify(allCardsFromServer));
          filterCards();
        })
        .catch((err) => {
          console.log(`Ошибка MoviesApi : ${err}`);

          updateLocalStorage('moviesSearchState', {
            error: err.message,
          });

          setMoviesSearchState({
            ...moviesSearchState,
            error: err,
          });
        });
    }
  }

  return (
    <div className={`page${isAuthPage ? ' page_auth' : ''}`}>
      {!isHeaderHidden && (
        <Header
          onAccountBtnClick={handleNavigateToProfile}
          onSignInBtnClick={handleNavigateToSignIn}
          onLogoClick={handleNavigateToMain}
          loggedIn={loggedIn}
        />
      )}

      {/* Временная заглушка авторизации */}
      {isMainRoute && loggedIn && <HamburgerButton />}
      {isProtectedRoute && <HamburgerButton />}

      {loggedIn && <MobileMenu onAccountBtnClick={handleNavigateToProfile} />}

      <Routes>
        <Route path="/" element={<Main onAnchorBtnClick={scrollToSection} />} />
        <Route
          path="/movies"
          element={
            <Movies
              moviesSearchState={moviesSearchState}
              onSearchFormSubmit={handleSearchFormSubmit}
              handleToggleCheckbox={handleToggleCheckbox}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={<Movies onSearchFormSubmit={handleSearchFormSubmit} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        {/* Preloader test */}
        <Route path="/loading" element={<Preloader />} />

        <Route
          path="/error"
          element={<NotFound onGoBackClick={handleGoBack} />}
        />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>

      {!isFooterHidden && <Footer />}
    </div>
  );
}

export default App;

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
  const [cards, setCards] = useState([]);
  // const [isMobileView, setIsMobileView] = useState(false);

  const [moviesSearchState, setMoviesSearchState] = useState(() => {
    const lastMoviesSearchState = JSON.parse(
      localStorage.getItem('moviesSearchState')
    );
    return (
      lastMoviesSearchState || {
        searchQueryText: '',
        foundedCards: [],
        shownCards: '',
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

  function handleSearchFormSubmit(searchQueryText) {
    getMoviesFromServer().then((allCardsFromServer) => {
      setCards(allCardsFromServer);

      const filteredCardsFromServer = allCardsFromServer.filter((card) => {
        const nameRU = card.nameRU ? card.nameRU.toLowerCase() : '';
        return nameRU.toLowerCase().includes(searchQueryText.toLowerCase());
      });

      setMoviesSearchState({
        ...moviesSearchState,
        searchQueryText,
        foundedCards: filteredCardsFromServer,
      });

      localStorage.setItem(
        'moviesSearchState',
        JSON.stringify({
          ...moviesSearchState,
          searchQueryText,
          foundedCards: filteredCardsFromServer,
        })
      );
    });
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
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Movies cards={cards} onSearchFormSubmit={handleSearchFormSubmit} />
          }
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

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
import SavedMovies from './Movies/SavedMovies';
import Register from './_auth/Register';
import Login from './_auth/Login';
import Profile from './_auth/Profile';
import NotFound from './NotFound/NotFound';
import Footer from './Footer/Footer';
import MobileMenu from './_UI_elements/MobileMenu/MobileMenu';
import HamburgerButton from './_UI_elements/HamburgerButton/HamburgerButton';
import ProtectedRoute from './ProtectedRoute';

import getMoviesFromServer from '../utils/MoviesApi';
import * as mainApi from '../utils/MainApi';
import Preloader from './Preloader/Preloader';

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

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isAuthChecking, setAuthChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });

  const [moviesSearchState, setMoviesSearchState] = useState(() => {
    const lastMoviesSearchState = JSON.parse(
      localStorage.getItem('moviesSearchState')
    );
    return (
      lastMoviesSearchState || {
        searchQueryText: '',
        filteredCards: [],
        isToggleChecked: false,
        isSearchPerformed: false,
        error: '',
      }
    );
  });

  function cleanAllData() {
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    });

    setMoviesSearchState({
      searchQueryText: '',
      filteredCards: [],
      isToggleChecked: false,
      isSearchPerformed: false,
      error: '',
    });

    localStorage.removeItem('moviesSearchState');
    localStorage.removeItem('allCards');
  }

  function tokenCheck() {
    mainApi
      .getUserInfo()
      .then((userDataFromServer) => {
        setCurrentUser({
          ...currentUser,
          name: userDataFromServer.name,
          email: userDataFromServer.email,
          _id: userDataFromServer._id,
        });

        setLoggedIn(true);
      })
      .catch((err) => {
        cleanAllData();

        console.log('Пользователь не авторизован :', err);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // Временная функция для переключения между состояниями loggedIn при нажатии L
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyL' || event.code === 'KeyД') {
        setLoggedIn(!isLoggedIn);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoggedIn]);

  function handleGoBack() {
    navigate(-1);
  }

  function handleNavigateToMain() {
    navigate('/');
  }

  function handleNavigateToProfile() {
    navigate('/profile');
    setIsMobileMenuOpen(false);
  }

  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false);
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

  function updateLocalStorageObj(key, newData) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      localStorage.setItem(key, JSON.stringify({ ...data, ...newData }));
    } else {
      localStorage.setItem(key, JSON.stringify({ ...newData }));
    }
  }

  function filterCards(cards, searchQueryText, isToggleChecked) {
    return cards.filter((card) => {
      const nameRU = card.nameRU ? card.nameRU.toLowerCase() : '';

      if (isToggleChecked && card.duration > 40) {
        return false;
      }

      return nameRU.toLowerCase().includes(searchQueryText.toLowerCase());
    });
  }

  function handleSearchCards() {
    try {
      const cards = JSON.parse(localStorage.getItem('allCards'));
      const { searchQueryText, isToggleChecked } = JSON.parse(
        localStorage.getItem('moviesSearchState')
      );

      const filteredCards = filterCards(
        cards,
        searchQueryText,
        isToggleChecked
      );

      updateLocalStorageObj('moviesSearchState', {
        filteredCards,
        error: '',
        isSearchPerformed: true,
      });

      setMoviesSearchState({
        ...moviesSearchState,
        searchQueryText,
        isToggleChecked,
        filteredCards,
        isSearchPerformed: true,
        error: '',
      });
    } catch (err) {
      console.log(`Ошибка filterCards: ${err}`);

      updateLocalStorageObj('moviesSearchState', {
        filteredCards: [],
        isSearchPerformed: false, // чтобы если обновить страницу пропала надпись
      });

      setMoviesSearchState({
        ...moviesSearchState,
        error: err,
      });
    }
  }

  function handleToggleCheckbox(isToggleChecked) {
    updateLocalStorageObj('moviesSearchState', { isToggleChecked });

    if (moviesSearchState.searchQueryText) {
      handleSearchCards();
    }
  }

  function handleSearchFormSubmit(searchQueryText) {
    setLoading(true);
    updateLocalStorageObj('moviesSearchState', { searchQueryText });

    if (!searchQueryText) {
      setMoviesSearchState({
        ...moviesSearchState,
        searchQueryText,
        filteredCards: [],
        isSearchPerformed: true,
        error: '',
      });

      updateLocalStorageObj('moviesSearchState', {
        filteredCards: [],
        isSearchPerformed: false, // чтобы если обновить страницу пропала надпись
      });
      setLoading(false);
      return;
    }

    const allCards = JSON.parse(localStorage.getItem('allCards'));

    if (allCards) {
      handleSearchCards();
      setLoading(false);
    } else {
      getMoviesFromServer()
        .then((allCardsFromServer) => {
          localStorage.setItem('allCards', JSON.stringify(allCardsFromServer));
        })
        .then(() => {
          handleSearchCards();
        })
        .catch((err) => {
          console.log(`Ошибка MoviesApi : ${err}`);

          updateLocalStorageObj('moviesSearchState', {
            error: err.message,
          });

          setMoviesSearchState({
            ...moviesSearchState,
            error: err,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const [authError, setAuthError] = useState({ status: '', message: '' });

  function handleLogin({ email, password }, resetForm) {
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.message === 'Successful authorization') {
          resetForm();
          setAuthError({ status: '', message: '' });
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .then(() =>
        mainApi.getUserInfo().then((userDataFromServer) => {
          console.log('userDataFromServer : ', userDataFromServer);
          setCurrentUser({
            ...currentUser,
            name: userDataFromServer.name,
            email: userDataFromServer.email,
            _id: userDataFromServer._id,
          });
        })
      )
      .catch((err) => {
        console.log('Ошибка при логине: ', err);
        setAuthError({ status: err.status, message: err.message });
      });
  }

  function handleEditProfile({ name, email }) {
    mainApi
      .sendUserInfo(name, email)
      .then((newUserDataFromServer) => {
        setAuthError({ status: '', message: '' });
        setCurrentUser({
          ...currentUser,
          name: newUserDataFromServer.name,
          email: newUserDataFromServer.email,
        });
      })
      .catch((err) => {
        console.log('Ошибка при изменении данных: ', err);
        setAuthError({ status: err.status, message: err.message });
      });
  }

  function handleRegister({ name, email, password }, resetRegistrationForm) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password }, resetRegistrationForm);
      })
      .catch((err) => {
        console.log('Ошибка при регистрации: ', err);
        setAuthError({ status: err.status, message: err.message });
      });
  }

  function handleSignOut() {
    mainApi
      .signOut()
      .then(() => {
        cleanAllData();
        setLoggedIn(false);
        navigate('/');
      })
      .catch((err) => {
        console.log('Ошибка при выходе: ', err);
      });
  }

  return (
    <div className={`page${isAuthPage ? ' page_auth' : ''}`}>
      {!isHeaderHidden && (
        <Header
          onAccountBtnClick={handleNavigateToProfile}
          onSignInBtnClick={handleNavigateToSignIn}
          onLogoClick={handleNavigateToMain}
          loggedIn={isLoggedIn}
        />
      )}

      {(isMainRoute || isProtectedRoute) && isLoggedIn && (
        <HamburgerButton
          isChecked={isMobileMenuOpen}
          setIsChecked={setIsMobileMenuOpen}
        />
      )}

      {isLoggedIn && (
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          onNavLinkClick={handleMobileMenuClose}
          onAccountBtnClick={handleNavigateToProfile}
        />
      )}

      {isAuthChecking ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Main onAnchorBtnClick={scrollToSection} />}
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                moviesSearchState={moviesSearchState}
                onSearchFormSubmit={handleSearchFormSubmit}
                handleToggleCheckbox={handleToggleCheckbox}
                component={Movies}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                onSearchFormSubmit={handleSearchFormSubmit}
                handleToggleCheckbox={handleToggleCheckbox}
                component={SavedMovies}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onSignOut={handleSignOut}
                currentUser={currentUser}
                authError={authError}
                setAuthError={setAuthError}
                handleEditProfile={handleEditProfile}
                component={Profile}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                authError={authError}
                setAuthError={setAuthError}
                isAuthPage
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                authError={authError}
                setAuthError={setAuthError}
                isAuthPage
              />
            }
          />

          <Route
            path="/error"
            element={<NotFound onGoBackClick={handleGoBack} />}
          />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      )}

      {!isFooterHidden && <Footer />}
    </div>
  );
}

export default App;

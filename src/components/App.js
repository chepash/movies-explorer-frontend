import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SHORT_MOVIE_MAX_DURATION } from '../utils/constants';

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

import CurrentUserContext from '../contexts/CurrentUserContext';

import getCardsFromServer from '../utils/MoviesApi';
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
  const [authError, setAuthError] = useState({ status: '', message: '' });
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });

  const [savedCards, setSavedCards] = useState([]);

  const [cardsSearchState, setCardsSearchState] = useState(() => {
    const lastCardsSearchState = JSON.parse(
      localStorage.getItem('cardsSearchState')
    );
    return (
      lastCardsSearchState || {
        searchQueryText: '',
        filteredCards: [],
        isToggleChecked: false,
        isSearchPerformed: false,
        error: '',
      }
    );
  });

  const [savedCardsSearchState, setSavedCardsSearchState] = useState({
    searchQueryText: '',
    filteredCards: [],
    isToggleChecked: false,
    isSearchPerformed: false,
    error: '',
  });

  function cleanAllData() {
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    });

    setCardsSearchState({
      searchQueryText: '',
      filteredCards: [],
      isToggleChecked: false,
      isSearchPerformed: false,
      error: '',
    });

    setSavedCardsSearchState({
      searchQueryText: '',
      filteredCards: [],
      isToggleChecked: false,
      isSearchPerformed: false,
      error: '',
    });

    localStorage.removeItem('cardsSearchState');
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

  function updateLocalStorageObj(key, newData) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      localStorage.setItem(key, JSON.stringify({ ...data, ...newData }));
    } else {
      localStorage.setItem(key, JSON.stringify({ ...newData }));
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      mainApi
        .getSavedCards()
        .then((savedCardsFromServer) => {
          setSavedCards(savedCardsFromServer);

          if (!savedCardsSearchState.filterCards) {
            setSavedCardsSearchState({
              ...savedCardsSearchState,
              filteredCards: savedCardsFromServer,
            });
          }
        })
        .catch((err) => {
          console.log('Ошибка api промиса getSavedCards: ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  function handleNavigateBack() {
    navigate(-1, { replace: true });
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

  function filterCards(cards, searchQueryText, isToggleChecked) {
    return cards.filter((card) => {
      const nameRU = card.nameRU ? card.nameRU.toLowerCase() : '';

      if (isToggleChecked && card.duration > SHORT_MOVIE_MAX_DURATION) {
        return false;
      }

      if (searchQueryText) {
        return nameRU.toLowerCase().includes(searchQueryText.toLowerCase());
      }

      return true;
    });
  }

  function handleCardsSearch() {
    try {
      const cards = JSON.parse(localStorage.getItem('allCards'));
      const { searchQueryText, isToggleChecked } = JSON.parse(
        localStorage.getItem('cardsSearchState')
      );

      const newFilteredCards = filterCards(
        cards,
        searchQueryText,
        isToggleChecked
      );

      updateLocalStorageObj('cardsSearchState', {
        filteredCards: newFilteredCards,
        error: '',
        isSearchPerformed: true,
      });

      setCardsSearchState({
        ...cardsSearchState,
        searchQueryText,
        isToggleChecked,
        filteredCards: newFilteredCards,
        isSearchPerformed: true,
        error: '',
      });
    } catch (err) {
      console.log(`Ошибка filterCards: ${err}`);

      updateLocalStorageObj('cardsSearchState', {
        filteredCards: [],
        isSearchPerformed: false, // false чтобы если обновить страницу пропала надпись
      });

      setCardsSearchState({
        ...cardsSearchState,
        error: err,
      });
    }
  }

  function handleSearchFormSubmit(searchQueryText) {
    setLoading(true);
    updateLocalStorageObj('cardsSearchState', { searchQueryText });

    if (!searchQueryText) {
      setCardsSearchState({
        ...cardsSearchState,
        searchQueryText,
        filteredCards: [],
        isSearchPerformed: true,
        error: '',
      });

      updateLocalStorageObj('cardsSearchState', {
        filteredCards: [],
        isSearchPerformed: false, // false чтобы пропала надпись если обновить страницу
      });
      setLoading(false);
      return;
    }

    const allCards = JSON.parse(localStorage.getItem('allCards'));

    if (allCards) {
      handleCardsSearch();
      setLoading(false);
    } else {
      getCardsFromServer()
        .then((allCardsFromServer) => {
          localStorage.setItem('allCards', JSON.stringify(allCardsFromServer));
        })
        .then(() => {
          handleCardsSearch();
        })
        .catch((err) => {
          console.log(`Ошибка MoviesApi : ${err}`);

          updateLocalStorageObj('cardsSearchState', {
            error: err.message,
          });

          setCardsSearchState({
            ...cardsSearchState,
            searchQueryText,
            isSearchPerformed: true,
            error: err,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function handleSavedCardsSearch(searchQueryText, isToggleChecked) {
    const newfilteredCards = filterCards(
      savedCards,
      searchQueryText,
      isToggleChecked
    );

    setSavedCardsSearchState({
      ...savedCardsSearchState,
      searchQueryText,
      isToggleChecked,
      filteredCards: newfilteredCards,
      isSearchPerformed: true,
      error: '',
    });
  }

  function handleSavedCardsSearchSubmit(searchQueryText, isToggleChecked) {
    setLoading(true);

    handleSavedCardsSearch(searchQueryText, isToggleChecked);
    setLoading(false);
  }

  function handleToggleCheckbox(isToggleChecked) {
    if (location.pathname === '/movies') {
      updateLocalStorageObj('cardsSearchState', { isToggleChecked });
      if (cardsSearchState.searchQueryText) {
        handleCardsSearch();
      }
    } else if (location.pathname === '/saved-movies') {
      handleSavedCardsSearch(
        savedCardsSearchState.searchQueryText,
        isToggleChecked
      );
    }
  }

  function handleLogin({ email, password }, resetForm) {
    setLoading(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.message === 'Successful authorization') {
          return mainApi.getUserInfo().then((userDataFromServer) => {
            setCurrentUser({
              ...currentUser,
              name: userDataFromServer.name,
              email: userDataFromServer.email,
              _id: userDataFromServer._id,
            });
          });
        }
        return Promise.reject(
          new Error(`Authorization failed: ${res.message}`)
        );
      })
      .then(() => {
        resetForm();
        setAuthError({ status: '', message: '' });
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log('Ошибка при логине: ', err);
        setAuthError({ status: err.status, message: err.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEditProfile({ name, email }, setIsSuccess) {
    setLoading(true);
    mainApi
      .sendUserInfo(name, email)
      .then((newUserDataFromServer) => {
        setAuthError({ status: '', message: '' });
        setCurrentUser({
          ...currentUser,
          name: newUserDataFromServer.name,
          email: newUserDataFromServer.email,
        });
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log('Ошибка при изменении данных: ', err.status);
        setAuthError({ status: 'OFFLINE', message: err.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleRegister({ name, email, password }, resetRegistrationForm) {
    setLoading(true);
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password }, resetRegistrationForm);
      })
      .catch((err) => {
        console.log('Ошибка при регистрации: ', err);
        setAuthError({ status: err.status, message: err.message });
      })
      .finally(() => {
        setLoading(false);
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

  function handleCardDelete(_id) {
    return mainApi
      .sendСardDeleteRequest(_id)
      .then(() => {
        const newSavedCards = savedCards.filter(
          (oldCard) => oldCard._id !== _id
        );
        setSavedCards(newSavedCards);

        const newFilteredCards = savedCardsSearchState.filteredCards.filter(
          (oldCard) => oldCard._id !== _id
        );
        setSavedCardsSearchState({
          ...savedCardsSearchState,
          filteredCards: newFilteredCards,
        });
      })
      .catch((err) => {
        console.log('Ошибка api промиса sendСardDeleteRequest: ', err);
      });
  }

  function handleCardLike(currentCard, _id, isLiked, setIsLiked) {
    if (isLiked === false) {
      mainApi
        .sendCard(currentCard)
        .then((newCardFromServer) => {
          const newSavedCards = [newCardFromServer, ...savedCards];
          setSavedCards(newSavedCards);

          setIsLiked(true);
        })
        .catch((err) => {
          console.log('Ошибка api промиса sendCard: ', err);
        });
    } else {
      handleCardDelete(_id)
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => {
          console.log('Ошибка при удалении карточки: ', err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                  cardsSearchState={cardsSearchState}
                  onSearchFormSubmit={handleSearchFormSubmit}
                  handleToggleCheckbox={handleToggleCheckbox}
                  // для карточки
                  onCardLike={handleCardLike}
                  savedCards={savedCards}
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
                  savedCardsSearchState={savedCardsSearchState}
                  setSavedCardsSearchState={setSavedCardsSearchState}
                  onSearchFormSubmit={handleSavedCardsSearchSubmit}
                  handleToggleCheckbox={handleToggleCheckbox}
                  // для карточки
                  onCardDelete={handleCardDelete}
                  savedCards={savedCards}
                  component={SavedMovies}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  onSignOut={handleSignOut}
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
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  handleRegister={handleRegister}
                  authError={authError}
                  setAuthError={setAuthError}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  authError={authError}
                  setAuthError={setAuthError}
                />
              }
            />

            <Route
              path="/error"
              element={<NotFound handleNavigateBack={handleNavigateBack} />}
            />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
        )}

        {!isFooterHidden && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

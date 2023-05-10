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

  const [savedCards, setSavedCards] = useState(() => {
    const lastSavedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    return lastSavedCards || [];
  });

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

  const [savedCardsSearchState, setSavedCardsSearchState] = useState(() => {
    const lastSavedCardsSearchState = JSON.parse(
      localStorage.getItem('savedCardsSearchState')
    );
    return (
      lastSavedCardsSearchState || {
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

    localStorage.removeItem('savedCardsSearchState');
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

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // setLoading(true);
      mainApi
        .getSavedCards()
        .then((savedCardsFromServer) => {
          console.log('savedCardsFromServer : ', savedCardsFromServer);
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
        });
      // .finally(() => {
      //   setLoading(false);
      // });
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

  function handleCardsSearch() {
    try {
      const cards = JSON.parse(localStorage.getItem('allCards'));
      const { searchQueryText, isToggleChecked } = JSON.parse(
        localStorage.getItem('cardsSearchState')
      );

      const filteredCards = filterCards(
        cards,
        searchQueryText,
        isToggleChecked
      );

      updateLocalStorageObj('cardsSearchState', {
        filteredCards,
        error: '',
        isSearchPerformed: true,
      });

      setCardsSearchState({
        ...cardsSearchState,
        searchQueryText,
        isToggleChecked,
        filteredCards,
        isSearchPerformed: true,
        error: '',
      });
    } catch (err) {
      console.log(`Ошибка filterCards: ${err}`);

      updateLocalStorageObj('cardsSearchState', {
        filteredCards: [],
        isSearchPerformed: false, // чтобы если обновить страницу пропала надпись
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
        isSearchPerformed: false, // чтобы пропала надпись если обновить страницу
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

  function handleSavedCardsSearch() {
    const { searchQueryText, isToggleChecked } = JSON.parse(
      localStorage.getItem('savedCardsSearchState')
    );

    const filteredCards = filterCards(
      savedCards,
      searchQueryText,
      isToggleChecked
    );

    updateLocalStorageObj('savedCardsSearchState', {
      filteredCards,
      error: '',
      // isSearchPerformed: true,
    });

    setSavedCardsSearchState({
      ...savedCardsSearchState,
      searchQueryText,
      isToggleChecked,
      filteredCards,
      isSearchPerformed: true,
      error: '',
    });
  }

  function handleSavedCardsSearchSubmit(searchQueryText) {
    setLoading(true);
    updateLocalStorageObj('savedCardsSearchState', { searchQueryText });

    if (!searchQueryText) {
      setSavedCardsSearchState({
        ...savedCardsSearchState,
        searchQueryText,
        filteredCards: savedCards,
        // isSearchPerformed: true,
        error: '',
      });

      updateLocalStorageObj('savedCardsSearchState', {
        filteredCards: savedCards,
        // isSearchPerformed: false, // чтобы пропала надпись если обновить страницу
      });
      setLoading(false);
    }

    handleSavedCardsSearch();
    setLoading(false);
  }

  function handleToggleCheckbox(isToggleChecked) {
    if (location.pathname === '/movies') {
      updateLocalStorageObj('cardsSearchState', { isToggleChecked });
      if (cardsSearchState.searchQueryText) {
        handleCardsSearch();
      }
    } else if (location.pathname === '/saved-movies') {
      updateLocalStorageObj('savedCardsSearchState', { isToggleChecked });

      handleSavedCardsSearch();
    }
  }

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

  function handleCardLike(currentCard, isLiked) {
    if (isLiked === false) {
      mainApi
        .sendCard(currentCard)
        .then((newCardFromServer) => {
          console.log('newCardFromServer : ', newCardFromServer);
          // setCards((state) => state.map(
          //   (oldCard) => (oldCard._id === currentCard._id ? newCardFromServer : oldCard),
          // ));
        })
        .catch((err) => {
          console.log('Ошибка api промиса sendCard: ', err);
        });
    } else {
      mainApi
        .sendСardDeleteRequest()
        .then((deletedCard) => {
          console.log('deletedCard : ', deletedCard);
          // setCards((state) => state.map(
          //   (oldCard) => (oldCard._id === currentCard._id ? newCardFromServer : oldCard),
          // ));
        })
        .catch((err) => {
          console.log('Ошибка api промиса sendСardDeleteRequest: ', err);
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
                // карточка
                onCardLike={handleCardLike}
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
                onSearchFormSubmit={handleSavedCardsSearchSubmit}
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
  );
}

export default App;

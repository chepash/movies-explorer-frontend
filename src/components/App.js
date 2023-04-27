import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';

import Footer from './Footer/Footer';
import MobileMenu from './MobileMenu/MobileMenu';
import HamburgerButton from './HamburgerButton/HamburgerButton';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Временная функция для переключения между состояниями loggedIn
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

  function scrollToSection() {
    const section = document.querySelector(`.about-project`);

    if (section !== null) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      {loggedIn && <HamburgerButton />}
      {loggedIn && <MobileMenu />}

      <Routes>
        <Route path="/" element={<Main onAnchorBtnClick={scrollToSection} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<Movies />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

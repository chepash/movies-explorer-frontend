import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';

import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<Movies />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

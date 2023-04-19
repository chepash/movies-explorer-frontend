// import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="page__container">
      <Header />
      <Main />

      {/* <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/sign-in" element={<Main />} />

        <Route path="/sign-up" element={<Main />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes> */}

      <Footer />
    </div>
  );
}

export default App;

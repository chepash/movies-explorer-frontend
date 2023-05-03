import React from 'react';
import './Preloader.scss';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
}

export default Preloader;

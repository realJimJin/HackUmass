import React from 'react';
import './home.css';

const AuthHome = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <h1 className="title">PortionPredictor</h1>
        <p className="slogan">Never waste food again.</p>
        <a href="./register" className="start-for-free-center">Start for Free</a>
      </div>
    </div>
  );
};

export default AuthHome;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './auth/home';
import Register from './auth/register';
import Login from './auth/login';

// Placeholder for user authentication logic
const user = false; // Set this to true if the user is logged in

export default function App() {
  return (
    <div>
      {user && <Menu />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/app" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/app" />} />
        <Route path="/app" element={user ? <AppContent /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function Menu() {
  return (
    <div className="menuBar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  );
}

function AppContent() {
  return (
    <div className='glass'>
      <MainContent />
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <h1>Breakfast</h1>
      <Meal />
      <h1>Lunch</h1>
      <Meal />
      <h1>Dinner</h1>
      <Meal />
    </div>
  );
}

function Meal() {
  const [calorie, setCalorie] = React.useState(0);

  function countCalorie() {
    setCalorie(calorie + 1);
  }

  return (
    <div className='glass'>
      <div className='glass__form__group'>
        <input className="glass__form__input" placeholder='Calories'></input>
      </div>
      <div className='glass__form__group'>
        <button className='glass__form__btn' onClick={countCalorie}>
          consumed {calorie} calories
        </button>
      </div>
    </div>
  );
}

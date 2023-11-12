import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import Home from './auth/home';
import Register from './auth/register';
import Login from './auth/login';

export default function App() {
  const { user, dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/app" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/app" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/app" />} />
        <Route path="/app" element={user ? <AppContent /> : <Navigate to="/" />} />
      </Routes>
      {user && <LogoutButton onLogout={logout} />}
    </div>
  );
}

function LogoutButton({ onLogout }) {
  return (
    <div className="menuBar">
      <ul>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </div>
  );
}

function AppContent() {
  return (
    <div className='content-container'>
      <h1>Portion Predictor</h1>
      <PersonalInfoForm />
      <MealEntryForm />
    </div>
  );
}

function PersonalInfoForm() {
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [userInfo, setUserInfo] = useState({ sex: '', age: '', height: '', weight: '' });
  const [showForm, setShowForm] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    console.log('User context:', user);
    if (user && user._id) {
      fetch(`https://hackumass.onrender.com/api/user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo({ ...data });
          setShowForm(false);
        })
        .catch(err => console.error(err));
    } else {
      console.error('User ID is undefined');
    }
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      console.error("No user information available");
      return;
    }
    fetch(`https://hackumass.onrender.com/api/user/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(() => setShowForm(false))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };


  return (
    <div className='glass'>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <h2>Personal Information</h2>
          <div className='glass__form__group'>
            <select className="glass__form__input" value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='glass__form__group'>
            <input className="glass__form__input" type="number" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className='glass__form__group'>
            <input className="glass__form__input" placeholder='Height (in)' value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className='glass__form__group'>
            <input className="glass__form__input" placeholder='Weight (lb)' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <button className='glass__form__btn'>Submit</button>
        </form>
      ) : (
        <div>
          {/* Display user's information */}
          <p>Sex: {sex}</p>
          <p>Age: {age}</p>
          <p>Height: {height} cm</p>
          <p>Weight: {weight} kg</p>
          <button onClick={() => setShowForm(true)}>Edit Info</button>
        </div>
      )}
    </div>
  );
}

function MealEntryForm() {
  const [mealType, setMealType] = useState('');
  const [calories, setCalories] = useState('');

  const handleMealSubmit = () => {
    // Placeholder for handling meal entry submit
    console.log({ mealType, calories });
  };

  return (
    <div className='glass'>
      <form onSubmit={handleMealSubmit}>
        <h2>Meal Entry</h2>
        <div className='glass__form__group'>
          <select className="glass__form__input" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className='glass__form__group'>
          <input className="glass__form__input" type="number" placeholder='Calories' value={calories} onChange={(e) => setCalories(e.target.value)} />
        </div>
        <button className='glass__form__btn'>Add Meal</button>
      </form>
    </div>
  );
}

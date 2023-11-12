import React from 'react';
import { useState } from 'react'
import './login.css';
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if(success) navigate('/app/home'); // Navigate to home page after successful login
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" disabled={isLoading}>Log In</button>
        <p className="signup-text">Don't have an account? <a href="/register">Sign Up</a></p>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;

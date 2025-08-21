// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(email);
      navigate('/habits');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login to HabitHero</h2>
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', margin: '5px', width: '250px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', margin: '5px', width: '250px' }}
        />
        <br />
        <button type="submit" style={{ 
          padding: '10px 20px', 
          margin: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <p style={{ marginTop: '20px' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default Login;

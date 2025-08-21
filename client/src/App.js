// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HabitHero from './components/HabitHero';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/habits" element={user ? <HabitHero user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! You can now login.");
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Sign Up for HabitHero</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', margin: '5px', width: '250px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', margin: '5px', width: '250px' }}
        />
        <br />
        <button type="submit" style={{ 
          padding: '10px 20px', 
          margin: '10px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <p style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;

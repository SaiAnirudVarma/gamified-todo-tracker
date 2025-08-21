// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7aAhlaXK0_yPFlMOfReutfDPpbjjGfvA",
  authDomain: "habit-hero-88730.firebaseapp.com",
  projectId: "habit-hero-88730",
  storageBucket: "habit-hero-88730.firebasestorage.app",
  messagingSenderId: "205618506379",
  appId: "1:205618506379:web:3a59d540367d69bfae428e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

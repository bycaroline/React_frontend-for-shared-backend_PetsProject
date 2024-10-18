import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage'
import { isAuthenticated } from './services/AuthService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startsida" element={isAuthenticated() ? <StartPage /> : <Navigate to="/" />} />
        {/* Startpage här är bara tillfällig, någonstans att landa när loggat in */}
      </Routes>
    </Router>
  );
}

export default App;

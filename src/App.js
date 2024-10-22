import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage'
import TestPage from './pages/TestPage';
import { isAuthenticated } from './services/AuthService';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startsida" element={isAuth ? <StartPage /> : <Navigate to="/" />} />
        {/* Startpage här är bara tillfällig, någonstans att landa när loggat in */}
        <Route path="/test" element={<TestPage />} /> {/* Lägg till TestPage här */}
      </Routes>
    </Router>
  );
}

export default App;

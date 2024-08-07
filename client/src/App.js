import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentLoginPage from './components/StudentLoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import StudentHomePage from './components/StudentHomePage';
import AdminHomePage from './components/AdminHomePage';
import AdminSignupPage from './components/AdminSignupPage';
import StudentSignupPage from './components/StudentSignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/student" element={<StudentLoginPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/signup/student" element={<StudentSignupPage />} />
        <Route path="/signup/admin" element={<AdminSignupPage />} />
        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;

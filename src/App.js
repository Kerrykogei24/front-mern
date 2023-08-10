import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import protectedRoute from './protectedRoute';
import AuthService from './AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {window.location.pathname === '/' && (
          <p className="mt-3">Please <Link to="/login">login</Link> to access the Dashboard.</p>
        )}
      </div>
    </Router>
  );
}

export default App;

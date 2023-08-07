// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Navbar from './Navbar';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import protectedRoute from './protectedRoute';
import AuthService from './AuthService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



function App() {
  const [authenticated, setAuthenticated] = useState(false);


  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/register" element={<RegistrationForm />} />
  <Route path="/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard />} />
</Routes>
    </Router>
  );
}

export default App;

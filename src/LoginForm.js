import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://3.89.74.19/api/auth/login', formData);
      console.log('Login successful');
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token in localStorage
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/register" className="btn btn-link">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

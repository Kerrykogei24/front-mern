// AuthService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in local storage
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Remove the token from local storage
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  },
};

export default AuthService;

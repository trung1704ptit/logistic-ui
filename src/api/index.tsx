// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:8000.com/api', // Replace with your API's base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem('token'); // Or use a secure storage solution
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      console.log('Unauthorized, redirecting to login...');
      window.location.href = '/login'; // Or handle logout
    }
    return Promise.reject(error);
  }
);

export default api;

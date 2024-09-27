import axios from 'axios';

// Add Axios Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

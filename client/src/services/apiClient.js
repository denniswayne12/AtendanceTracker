import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.create({
  baseURL: process.env.REACT_APP_API_URL || '/api', // Make sure this matches your backend route
  withCredentials: true
});

export default apiClient;
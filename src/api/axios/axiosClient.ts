import axios from 'axios';
import { logout } from './AuthBridge';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.token === false ) {
      logout(); // Trigger logout on unauthorized access
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
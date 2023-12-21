// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers['Authorization'] = `JWT ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/refresh/', {
          refresh: localStorage.getItem('refresh'),
        });

        // Update the original request with the new access token
        originalRequest.headers['Authorization'] = `JWT ${response.data.access}`;
        localStorage.setItem('access', response.data.access);

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token Refresh Error:', refreshError);
        // Handle refresh token error (e.g., redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

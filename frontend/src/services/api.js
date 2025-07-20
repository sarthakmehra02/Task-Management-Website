// frontend/src/services/api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Request Interceptor to add the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// --- User/Auth Services ---
export const registerUser = (userData) => apiClient.post('/users/register', userData);
export const loginUser = (userData) => apiClient.post('/users/login', userData);


// --- Task Services ---
export const getTasks = () => apiClient.get('/tasks');

export const createTask = (taskData) => apiClient.post('/tasks', taskData);

// THIS IS THE FUNCTION TO CHECK CAREFULLY
export const updateTask = (id, taskData) => {
  // The URL is built using template literals ``.
  // This ensures there are no extra characters.
  return apiClient.put(`/tasks/${id}`, taskData); 
};

// Add the delete task function as well
export const deleteTask = (id) => {
  return apiClient.delete(`/tasks/${id}`);
};


export default apiClient;
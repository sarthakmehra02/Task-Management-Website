

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

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

export const registerUser = (userData) => apiClient.post('/users/register', userData);
export const loginUser = (userData) => apiClient.post('/users/login', userData);

export const getTasks = () => apiClient.get('/tasks');

export const createTask = (taskData) => apiClient.post('/tasks', taskData);

export const updateTask = (id, taskData) => {
  return apiClient.put(`/tasks/${id}`, taskData); 
};
export const deleteTask = (id) => {
  return apiClient.delete(`/tasks/${id}`);
};


export default apiClient;
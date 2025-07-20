import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Here you would ideally have an endpoint to verify the token and get user data
        // For simplicity, we'll assume the token is valid if it exists.
        // A better approach: call an endpoint like /api/users/me
        setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.loginUser({ email, password });
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      // You can add state to show an error message to the user
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.registerUser({ name, email, password });
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = { user, login, logout, register, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
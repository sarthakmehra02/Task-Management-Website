import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
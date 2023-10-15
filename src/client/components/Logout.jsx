import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken, setIsLoggedIn, setShowLogoutMessage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token from localStorage
    sessionStorage.removeItem('token');
    
    // 2. Update the application state
    setToken('');
    setIsLoggedIn(false);
    
    // 3. Show the logout message
    setShowLogoutMessage(true);
    
    // 4. Redirect the user to the homepage (or a login page)
    navigate('/');
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken, setIsLoggedIn, setShowLogoutMessage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token from sessionStorage
    sessionStorage.removeItem('token');
    
    // 2. Update the application state
    setToken('');
    setIsLoggedIn(false);
    
    // 3. Show the logout message
    setShowLogoutMessage(true);
    
    // 4. Redirect the user to the homepage (or a login page)
    navigate('/', { replace: true });

    // Force a hard reload to ensure all components reinitialize
    window.location.reload();
  }

  return (
    <button onClick={handleLogout} className="logout-button">
    Logout
  </button>
  );
};

export default Logout;


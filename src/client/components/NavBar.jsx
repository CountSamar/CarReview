import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // <-- import useLocation
import Logout from './Logout';
import '../style.css';

const NavBar = ({ 
    setToken, 
    setIsLoggedIn, 
    isLoggedIn,
    setShowLogoutMessage
}) => {
    
    const location = useLocation();  // <-- useLocation hook to get current route

    const renderLoggedOutLinks = () => (
        <>
            <Link className="nav-link" to='/login'>Login</Link>
            {/* Only show Profile link when on the homepage */}
            {location.pathname === '/' && <Link className="nav-link" to='/profile'>Profile</Link>}
        </>
    );

    const renderLoggedInLinks = () => (
        <>
            {/* Show Profile link when logged in and on the homepage */}
            {location.pathname === '/' && <Link className="nav-link" to='/profile'>Profile</Link>}
            <Logout 
                setToken={setToken} 
                setIsLoggedIn={setIsLoggedIn} 
                setShowLogoutMessage={setShowLogoutMessage} 
            />
        </>
    );

    return (
        <div className='navbarcontainer'>
            <div>
                <Link className="nav-link" to='/'>Home</Link>
                <Link className="nav-link" to="/signup">SignUp</Link>
                {isLoggedIn ? renderLoggedInLinks() : renderLoggedOutLinks()}
            </div>
        </div>
    );
}

export default NavBar;

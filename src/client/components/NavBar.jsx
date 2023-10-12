import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const NavBar = ({ 
    setToken, 
    setIsLoggedIn, 
    isLoggedIn,
    setShowLogoutMessage // 1. Add setShowLogoutMessage to the prop destructuring 
}) => {
    return (
      <>
        <div className='navbarcontainer'>
          <div>
            <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/'>Home</Link>
            <Link style={{ display: "inline-block", paddingRight: "5px" }} to="/signup">SignUp</Link>
            { isLoggedIn ? (
              // 2. Pass setShowLogoutMessage prop to the Logout component
              <Logout 
                  setToken={setToken} 
                  setIsLoggedIn={setIsLoggedIn} 
                  setShowLogoutMessage={setShowLogoutMessage} 
              />
            ) : (
              <>
                <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/login'>Login</Link>
                <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/profile'>Profile</Link>
              </>
            )}
          </div>
        </div>
      </>
    );
}

export default NavBar;

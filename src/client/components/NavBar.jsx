import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return(
        <>
            <div className='navbarcontainer'>
                

                <div>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/'>Profile</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to="/signup">SignUp</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/login'>Login</Link>
                    
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/logout'>Logout</Link>

                </div>

            </div>
        </>

    );
}

export default NavBar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return(
        <>
            <div className='navbarcontainer'>
                <h1>Capstone Project</h1>

                <div>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/'>Profile</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to="/Register">SignUp</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/login'>Login</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to="/review/new">Write A Review</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to="/reviews">Reviews</Link>
                    <Link style={{ display: "inline-block", paddingRight: "5px" }} to='/logout'>Logout</Link>

                </div>

            </div>
        </>

    );
}

export default NavBar;
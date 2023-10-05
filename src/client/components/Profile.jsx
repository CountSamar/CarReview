import React, { useState, useEffect } from 'react';
import Logout from './Logout';
import Review from './Review';
import WriteReview from './WriteReview';
import Friend from './Friend';

const Profile = () => {
    return ( 
        <div style={{marginTop: "8rem"}}>
        <h1>Profile</h1>
        <Friend />
        <Review />
        <WriteReview />

        </div>
     );
}
 
export default Profile;

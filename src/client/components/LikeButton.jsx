import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const LikeButton = () => {
    const [likes, setLikes] = useState(0)
    const handleLike = () => {
        setLikes(likes + 1)
    }

    return ( 
    
    <>
    <div className='likes'>
        <p>Likes: {likes}</p>
        <button onClick={handleLike}><FontAwesomeIcon icon={faThumbsUp} /></button>
    </div>
    </>
    
    );
}
 
export default LikeButton;
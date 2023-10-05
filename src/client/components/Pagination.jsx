import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';

//Going to make a 5 review list before more load.
const reviewsPerPage = 3

const Pagination = ({ ReviewCard }) => {
    const [reviews, setReviews] = useState([...initialReviews])
    const [currentPage, setCurrentPage] = useState(1)
    const reviewsPerPage = 3

    const handleScroll = () => {
        const { }
    }

    return (
        <>
        
        </>
     );
}
 
export default Pagination;
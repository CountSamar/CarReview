import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';

const Pagination = () => {
  const [reviews, setReviews] = useState([...initialReviews]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const totalReviewsCount = 100; 

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreReviews();
    }
  };

  const loadMoreReviews = () => {
    const additionalReviews = fetchMoreReviews(currentPage, itemsPerPage);
    setReviews([...reviews, ...additionalReviews]);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);  

  return (
    <div>
      {/* Display reviews using ReviewCard component */}
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default Pagination;
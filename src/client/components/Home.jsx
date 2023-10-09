import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Review from './Review'

const Home = ({ Review }) => {
    const ReviewsList = () => {
        const [filteredReviews, setFilteredReviews] = useState(reviewsData);
      
        const handleSearch = (searchTerm) => {
          const filtered = Review.filter((review) =>
            review.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredReviews(filtered);
        };
    }

    return ( 
    
    <>
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="reviews-container">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
    </> 
    
    );
}
 
export default Home;
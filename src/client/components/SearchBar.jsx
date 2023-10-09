import React, { useState } from 'react';
import Review from './Review'

const SearchBar = ({ Review }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
   setSearchTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        const resultsArray = Review.filter(review => review.title.includes(e.target.value) || review.body.includes(e.target.value))
        console.log('Search term:', searchTerm)
    }
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Search reviews..."
      value={searchTerm}
      onChange={handleInputChange}
    />
    <button type="submit" className="search_button">
      Search
    </button>
  </form>
  );
};

export default SearchBar;
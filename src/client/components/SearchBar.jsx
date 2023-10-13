import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  let navigate = useNavigate()

      const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      };
  
  //this should run on submit -> navigates to the search results page with the search term as a param
  const handleSubmit = (e) => {
    console.log("Search term:", searchTerm);
    console.log(resultsArray);
    //this is setting the param below : ?searchTerm=" + searchTerm
    navigate("/search-results?searchTerm=" + searchTerm);
    // const resultsArray = Review.filter(review => review.cars.includes(e.target.value) || review.body.includes(e.target.value))
  }
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Search reviews..."
      value={searchTerm}
      onChange={handleInputChange}
    />
    <button type="submit" className="search_button" onClick={(e)=>handleSubmit(e)} >
      Search
    </button>
  </form>
  );
};

export default SearchBar;
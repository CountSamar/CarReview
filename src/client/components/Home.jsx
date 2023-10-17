import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'; // Import the Link component
import SearchBar from "./SearchBar";
import ChatHistory from "./ChatHistory"; // Import the ChatHistory component

const Home = ({ username }) => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postError, setPostError] = useState(null); 
  const [filteredReviews, setFilteredReviews] = useState([]); 

  const isAuthenticated = () => sessionStorage.getItem("token");
  let token = isAuthenticated();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userNameForChat = decodedToken.user_name;
      console.log("Decoded user_name:", userNameForChat);
      setIsLoggedIn(!!token);
    }
    fetchLatestReviews();
  }, []);

  const fetchLatestReviews = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/reviews/latest");
      if (!response.ok) throw new Error("Failed to fetch latest reviews");
      const data = await response.json();

      const formattedReviews = await Promise.all(
        data.data.map(async (review) => {
          const chatResponse = await fetch(
            `http://localhost:5001/api/chats/for-review/${review.id}`
          );
          const chats = await chatResponse.json();
          return {
            ...review,
            comments: chats.data,
          };
        })
      );

      setLatestReviews(formattedReviews);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async (term) => {
    console.log("Searching for:", term);

    try {
      const response = await fetch(`http://localhost:5001/api/reviews/search?term=${term}`);
      if (!response.ok) throw new Error("Failed to fetch reviews based on the search term.");

      const results = await response.json();
      setFilteredReviews(results);
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  const postComment = async (reviewIndex) => {
    // ... (your existing postComment code)
  };

  const deleteComment = async (reviewIndex, chat_id) => {
    // ... (your existing deleteComment code)
  };

  const reviewsToDisplay = filteredReviews.length ? filteredReviews : latestReviews;

  return (
    <section className="latest-reviews">
      <SearchBar onSearch={handleSearch} />

      {/* Add a link to the ChatHistory component */}
      <Link to={`/chat-history/${username}`}>Go to Chat History</Link>


      {filteredReviews.length ? (
        <button onClick={() => setFilteredReviews([])}>Clear Search</button>
      ) : null}

      {/* Displaying the reviews to display (filtered or latest reviews) */}
      {reviewsToDisplay.map((review, index) => (
        <div className="review" key={review.id}>
          <h2>Rating: {review.rating} out of 5</h2>
          <p>Review: {review.comment}</p>
          <p>Reviewed by: {review.user_name}</p>
          <p>Car Model: {review.car_model}</p>
          <p>Car Make: {review.car_brand}</p>
          <p>Car Year: {review.car_year}</p>
          <img src={`http://localhost:5001/${review.imgpath}`} alt="Review Image" />
          <div className="chat-section">
            <h2>Comments</h2>
            {review.comments?.map((comment, idx) => (
              <div key={idx} className="comment">
                <strong>{comment.user_name}:</strong> {comment.comm}
                {isLoggedIn && comment.user_name === username && (
                  <button onClick={() => deleteComment(index, comment.chat_id)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
            {!isLoggedIn ? (
              <div className="prompt-login">
                <p>Please <a href="/signup">sign up</a> or <a href="/login">login</a> to add a comment.</p>
              </div>
            ) : (
              <div className="logged-in-content">
                <div className="add-comment-section">
                  <textarea
                    placeholder="Add a comment..."
                    value={newComments[index] || ""}
                    onChange={(e) => setNewComments((prev) => ({...prev, [index]: e.target.value}))}
                  />
                  <button onClick={() => postComment(index)}>Post</button>
                </div>
                {postError && (
                  <div className="error-message">{postError}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Render the ChatHistory component */}
      
    </section>
  );
};

export default Home;

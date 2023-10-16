import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import SearchBar from "./SearchBar";

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
    fetchLatestReviews();  // This will always fetch the reviews, irrespective of the login status
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
      // Optionally, you can set an error state here to notify the user about the error
    }
  };
  

  const postComment = async (reviewIndex) => {
    try {
      const review = latestReviews[reviewIndex];
      const commentText = newComments[reviewIndex];
      if (!commentText) return;

      const response = await fetch(`http://localhost:5001/api/chats/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          reviewId: review.id,
          userName: username, // Use the username from your context
          commentText,
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const newComment = await response.json();
      setLatestReviews((prev) => {
        const newReviews = [...prev];
        if (!newReviews[reviewIndex].comments)
          newReviews[reviewIndex].comments = [];
        newReviews[reviewIndex].comments.push(newComment);
        return newReviews;
      });

      setNewComments((prev) => ({ ...prev, [reviewIndex]: "" }));

      // Clear the postError state when there's no error
      setPostError(null);
    } catch (error) {
      if (
        error.message === "Failed to post comment" &&
        error.response.status === 401
      ) {
        localStorage.removeItem("token");
        // Optionally redirect to login or show a message
      }
      console.error("Failed to post comment:", error);

      // Set the postError state when there's an error
      setPostError("Failed to post comment. Please try again later.");
    }
  };

  const deleteComment = async (reviewIndex, chat_id) => {
    let response;  // Declare the response variable here
    try {
      console.log("Deleting chat with ID:", chat_id);
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);
      response = await fetch(`http://localhost:5001/api/chats/delete/${chat_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete comment");
  
      setLatestReviews(prev => {
        const updatedReviews = [...prev];
        updatedReviews[reviewIndex].comments = updatedReviews[reviewIndex].comments.filter(comment => comment.chat_id !== chat_id);
        return updatedReviews;
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      if (response) {  // Now response is accessible here
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    }
  };
  
  const reviewsToDisplay = filteredReviews.length ? filteredReviews : latestReviews;
 

  return (
    <section className="latest-reviews">
        <SearchBar onSearch={handleSearch} />
        
        {filteredReviews.length ? <button onClick={() => setFilteredReviews([])}>Clear Search</button> : null}
        
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
    </section>
  );
};

export default Home;
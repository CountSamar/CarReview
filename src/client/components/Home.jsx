import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom"; // Import the Link component
import SearchBar from "./SearchBar";
import ChatHistory from "./ChatHistory"; // Import the ChatHistory component
import "../Home.css";
const BACKEND_URL = "https://carreviewweb.onrender.com";

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
      const response = await fetch(`${BACKEND_URL}/api/reviews/latest`);
      if (!response.ok) throw new Error("Failed to fetch latest reviews");
      const data = await response.json();

      const formattedReviews = await Promise.all(
        data.data.map(async (review) => {
          const chatResponse = await fetch(
            `${BACKEND_URL}/api/chats/for-review/${review.id}`
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
  const fetchCommentsForReview = async (reviewId, reviewIndex) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/chats/for-review/${reviewId}`
      );
      if (!response.ok)
        throw new Error("Failed to fetch comments for the review");
      const commentsData = await response.json();
      setLatestReviews((prev) => {
        const updatedReviews = [...prev];
        updatedReviews[reviewIndex].comments = commentsData.data;
        return updatedReviews;
      });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };
  const handleSearch = async (term) => {
    console.log("Searching for:", term);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/reviews/search?term=${term}`
      );
      if (!response.ok)
        throw new Error("Failed to fetch reviews based on the search term.");

      const results = await response.json();
      setFilteredReviews(results);
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  const postComment = async (reviewIndex) => {
    if (!isLoggedIn) {
      console.warn("Unauthorized user attempted to post a comment.");
      return;
    }

    try {
      const review = latestReviews[reviewIndex];
      const commentText = newComments[reviewIndex];
      if (!commentText) return;

      const response = await fetch(`${BACKEND_URL}/api/chats/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          reviewId: review.id,
          userName: username,
          commentText,
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      // Fetch latest comments
      fetchCommentsForReview(review.id, reviewIndex);

      // Clear the input field
      setNewComments((prev) => ({ ...prev, [reviewIndex]: "" }));

      // Clear the postError state
      setPostError(null);
    } catch (error) {
      console.error("Failed to post comment:", error);
      setPostError("Failed to post comment. Please try again later.");
    }
  };

  const deleteComment = async (reviewIndex, chat_id) => {
    let response; // Declare the response variable here
    try {
      console.log("Deleting chat with ID:", chat_id);
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);
      response = await fetch(
        `${BACKEND_URL}/api/chats/delete/${chat_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete comment");

      setLatestReviews((prev) => {
        const updatedReviews = [...prev];
        updatedReviews[reviewIndex].comments = updatedReviews[
          reviewIndex
        ].comments.filter((comment) => comment.chat_id !== chat_id);
        return updatedReviews;
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      if (response) {
        // Now response is accessible here
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    }
  };

  console.log(latestReviews.map((review) => review.comments));

  const reviewsToDisplay = filteredReviews.length
    ? filteredReviews
    : latestReviews;

  return (
    <section className="latest-reviews">
      <SearchBar onSearch={handleSearch} />

      <Link to={`/chat-history/${username}`}>Comment History</Link>

      {filteredReviews.length ? (
        <button onClick={() => setFilteredReviews([])}>Clear Search</button>
      ) : null}

      {/* Displaying the reviews to display (filtered or latest reviews) */}
      {reviewsToDisplay.map((review, index) => (
        <div className="review" key={review.id}>
          <h1>
            {review.car_year} {review.car_brand} {review.car_model} 
          </h1>

          <img
            src={`${BACKEND_URL}/${review.imgpath}`}
            alt="Review Image"
          />
          <p> {review.comment}</p>
          <p>Reviewed by: {review.user_name}</p>
          <h2>Rating: {review.rating} out of 5</h2>

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
                <p>
                  Please <a href="/signup">sign up</a> or{" "}
                  <a href="/login">login</a> to add a comment.
                </p>
              </div>
            ) : (
              <div className="logged-in-content">
                <div className="add-comment-section">
                  <textarea
                    placeholder="Add a comment..."
                    value={newComments[index] || ""}
                    onChange={(e) =>
                      setNewComments((prev) => ({
                        ...prev,
                        [index]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => postComment(index)}>Post</button>
                </div>
                {postError && <div className="error-message">{postError}</div>}
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

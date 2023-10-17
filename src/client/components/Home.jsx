import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
const backendUrl = "https://carreviewweb.onrender.com";

const Home = ({ username }) => {
 
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postError, setPostError] = useState(null); 
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setIsLoggedIn(true);
    }
    fetchLatestReviews();
  }, []);

  const fetchLatestReviews = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/reviews/latest`);
      if (!response.ok) throw new Error("Failed to fetch latest reviews");

      const data = await response.json();
      setLatestReviews(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await fetch(`${backendUrl}/api/reviews/search?term=${term}`);
      if (!response.ok) throw new Error("Failed to fetch reviews based on the search term.");

      const results = await response.json();
      setFilteredReviews(results);
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  const postComment = async (reviewIndex) => {
    try {
      const review = latestReviews[reviewIndex];
      const commentText = newComments[reviewIndex];
      if (!commentText) return;

      const response = await fetch(`${backendUrl}/api/chats/add`, {
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

      const newComment = await response.json();
      setLatestReviews(prev => {
        const updatedReviews = [...prev];
        updatedReviews[reviewIndex].comments.push(newComment);
        return updatedReviews;
      });
      setNewComments(prev => ({ ...prev, [reviewIndex]: "" }));
    } catch (error) {
      setPostError("Failed to post comment. Please try again later.");
    }
  };

  const deleteComment = async (reviewIndex, chat_id) => {
    try {
      const response = await fetch(`${backendUrl}/api/chats/delete/${chat_id}`, {
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
    }
  };

  const reviewsToDisplay = filteredReviews.length ? filteredReviews : latestReviews;

  return (
    <section className="latest-reviews">
      <SearchBar onSearch={handleSearch} />
      <Link to={`/chat-history/${username}`}>Comment History</Link>
      {filteredReviews.length ? (
        <button onClick={() => setFilteredReviews([])}>Clear Search</button>
      ) : null}
      {reviewsToDisplay.map((review, index) => (
        <div className="review" key={review.id}>
          {/* ... */}
        </div>
      ))}
    </section>
  );
};

export default Home;

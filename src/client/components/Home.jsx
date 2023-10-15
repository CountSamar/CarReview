import React, { useEffect, useState } from "react";

const Home = ({ username }) => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postError, setPostError] = useState(null); // Define postError state

  const isAuthenticated = () => sessionStorage.getItem("token");
  let token = isAuthenticated();

  useEffect(() => {
    console.log("useEffect in Home component triggered.");
    setIsLoggedIn(!!token);
    fetchLatestReviews();
  }, [token]);

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

  const postComment = async (reviewIndex) => {
    try {
      const review = latestReviews[reviewIndex];
      const commentText = newComments[reviewIndex];
      if (!commentText) return;

      const response = await fetch(`http://localhost:5001/api/chats/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <section className="latest-reviews">
      {latestReviews.map((review, index) => (
        <div className="review" key={review.id}>
          <h2>Rating: {review.rating}</h2>
          <p>Reviewed by: {review.user_name}</p>
          <p>Car Model: {review.car_model}</p>
          <p>Car Make: {review.car_brand}</p>
          <p>Car Year: {review.car_year}</p>
          <img
            src={`http://localhost:5001/${review.imgpath}`}
            alt="Review Image"
          />
          <div className="chat-section">
            <h2>Comments</h2>
            {review.comments?.map((comment, idx) => (
              <div key={idx} className="comment">
                <strong>{comment.user_name}:</strong> {comment.comm}
              </div>
            ))}
  {console.log("isLoggedIn:", isLoggedIn)}
            {!isLoggedIn ? ( // Content for not logged-in users
              <div className="prompt-login">
                <p>
                  Please <a href="/signup">sign up</a> or{" "}
                  <a href="/login">login</a> to add a comment.
                </p>
              </div>
            ) : (
              // Content for logged-in users
              <div className="logged-in-content">
                {/* Add content for logged-in users here */}
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
                {postError && ( // Display postError message when it's defined
                  <div className="error-message">{postError}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );}

export default Home;

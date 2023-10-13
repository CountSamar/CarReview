import React, { useEffect, useState } from "react";

const Home = ({ username }) => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const isAuthenticated = () => localStorage.getItem("token");
  let token = isAuthenticated()
  // if(token){
  //   setIsLoggedIn(true)
  // }
  
 
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

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await fetch("/api/reviews/latest");
        if (!response.ok) throw new Error("Failed to fetch latest reviews");
        const data = await response.json();
        console.log(data);
        setLatestReviews(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    
    
    fetchLatestReviews();
  }, []);

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
    } catch (error) {
      if (
        error.message === "Failed to post comment" &&
        error.response.status === 401
      ) {
        localStorage.removeItem("token");
        // Optionally redirect to login or show a message
      }
      console.error("Failed to post comment:", error);
      setError(error.message);
    }
  };

  // console.log(error)
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className="latest-reviews">
        {Array.isArray(latestReviews) &&
          latestReviews.map((review, index) => (
            <div className="review" key={index}>
              <h1>Rating: {review.rating} out of 5</h1>
              <p>Reviewed by: {review.user_name}</p>
              <p>Car Model: {review.car_model}</p>
              <p>Car Make: {review.car_brand}</p>
              <p>Car Year: {review.car_year}</p>
              <img
                src={
                  review.imgpath
                    ? `http://localhost:3000/api/${review.imgpath}`
                    : "src/server/api/uploads/1696817981885-tesla model 3.jpeg"
                }
                alt="Car"
              />
              <p>{review.comment}</p>

              <div className="chat-section">
                <h2>Comments</h2>
                {review.comments &&
                  review.comments.map((comment, idx) => (
                    <div key={idx} className="comment">
                      <span>
                        <strong>{comment.user_name}:</strong> {comment.comm}
                      </span>
                    </div>
                  ))}

                {token && (
                  <>
                    

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
                   
      
                  </>
                ) }
                  <p>
                    Please <a href="/signup">sign up</a> or{" "}
                    <a href="/login">login</a> to add a comment.
                  </p>
                
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default Home;

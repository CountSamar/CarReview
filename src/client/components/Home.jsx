import React, { useState, useEffect } from "react";

const Home = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/reviews/latest");
        if (!response.ok) throw new Error("Failed to fetch latest reviews");
        const data = await response.json();
        setLatestReviews(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLatestReviews();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className="latest-reviews">
        {Array.isArray(latestReviews) &&
          latestReviews.map((review) => (
            <div className="review" key={review.id}>
              <h1>Brand: {review.brand}</h1>
              <h2>Model: {review.model}</h2>
              <p>Reviewed by: {review.user_name}</p>
              <img
                src={
                  review.car_image
                    ? `http://localhost:5001/${review.car_image}`
                    : "src/server/api/uploads/1696817981885-tesla model 3.jpeg"
                }
                alt="Car"
              />
              <p>Rating: {review.rating} out of 5</p>
              <blockquote>{review.comment}</blockquote>
            </div>
          ))}
      </section>
    </>
  );
};

export default Home;

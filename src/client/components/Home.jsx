import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Import the date-fns library

const Home = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/reviews/latest");
        if (!response.ok) throw new Error("Failed to fetch latest reviews");
        const data = await response.json();

        // Format dates here before setting state
        const formattedReviews = data.data.map((review) => ({
          ...review,
          // Assuming review.date_created is in ISO 8601 format, you can format it like this:
          date_created: review.date_created
            ? format(new Date(review.date_created), "MM/dd/yyyy hh:mm:ss a")
            : null,
        }));

        setLatestReviews(formattedReviews);
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
                    ? `http://localhost:5001/${review.imgpath}`
                    : "src/server/api/uploads/1696817981885-tesla model 3.jpeg"
                }
                alt="Car"
              />
              <p>{review.comment}</p>
            </div>
          ))}
      </section>
    </>
  );
};

export default Home;

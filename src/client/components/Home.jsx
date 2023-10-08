import React, { useState, useEffect } from "react";

const Home = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle the form submission
  const submitForm = async () => {
    const formData = new FormData(document.getElementById("carForm"));

    try {
      const response = await fetch("http://localhost:5001/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with error:", errorData);
        throw new Error("Failed to upload car");
      }

      const data = await response.json();
      console.log("Car uploaded:", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/reviews/latest"
        );
        if (!response.ok) throw new Error("Failed to fetch latest reviews");
        const data = await response.json();
        console.log("Latest reviews data:", data);
        setLatestReviews(data.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchLatestReviews();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Car Upload */}
      <section className="car-upload">
        <h2>Upload a Car</h2>
        <form id="carForm">
          <input type="text" name="model" placeholder="Enter car name" />
          <input type="text" name="brand" placeholder="Enter car brand" />
          <input type="text" name="year" placeholder="year" />

          <input type="file" name="carImage" />
          <button type="button" onClick={submitForm}>
            Upload
          </button>
        </form>
      </section>

      {/* Latest Reviews */}
      <section className="latest-reviews">
        {latestReviews.map((review) => (
          <div className="review" key={review.id}>
            <h3>{review.car_name}</h3> {/* Display the car's name */}
            <p>Reviewed by: {review.user_name}</p>{" "}
            {/* Display the user's name */}
            <img src={review.car_image} alt="Car associated with the review" />

            <p>Rating: {review.rating} out of 5</p>
            <blockquote>{review.comment}</blockquote>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;

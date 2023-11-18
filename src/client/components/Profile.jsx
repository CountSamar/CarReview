import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../profile.css";
import Logout from "./Logout";

const BACKEND_URL = "https://carreviewweb.onrender.com";

const Profile = ({
  username,
  setToken,
  setIsLoggedIn,
  setShowLogoutMessage,
}) => {
  const [formData, setFormData] = useState({
    reviewText: "",
    carModel: "",
    carBrand: "",
    carYear: "",
    rating: "0",
    imgFile: null,
  });
  const [editFormData, setEditFormData] = useState({
    reviewText: "",
    carModel: "",
    carBrand: "",
    carYear: "",
    rating: "0",
    imgFile: null,
  });
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    console.log("Updated reviews state:", reviews);
  }, [reviews]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/reviews/user/${username}`
        );
        const data = await response.json();

        if (!response.ok) {
          const errorMessage =
            data && data.message ? data.message : "Error fetching reviews";
          throw new Error(errorMessage);
        }

        setReviews(data);
      } catch (error) {
        console.error("Error fetching user's reviews:", error);
        setMessage("Error fetching your reviews. Please try again.");
      }
    };

    fetchReviews();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      imgFile: e.target.files[0],
    }));
  };

  const submitReview = async () => {
    console.log("Form data before submission:", formData);
    setMessage(null);
    const { reviewText, carModel, carBrand, carYear, imgFile, rating } = formData;

    if (
      reviewText.trim() &&
      carModel.trim() &&
      carBrand.trim() &&
      carYear.trim() &&
      imgFile &&
      parseInt(rating) >= 1 &&
      parseInt(rating) <= 5
    ) {
      try {
        const formSubmission = new FormData();
        formSubmission.append("user_name", username);
        formSubmission.append("carModel", carModel);
        formSubmission.append("carBrand", carBrand);
        formSubmission.append("carYear", carYear);
        formSubmission.append("comment", reviewText);
        formSubmission.append("imgpath", imgFile);
        formSubmission.append("rating", rating);

        const response = await fetch(`${BACKEND_URL}/api/reviews/create`, {
          method: "POST",
          body: formSubmission,
        });
        console.log("Response from server:", response);
        const data = await response.json();
        console.log("Data received from server:", data);

        if (!response.ok) {
          throw Error(data.message || "Error submitting the review");
        }
        console.log("Review data from server:", data.review);

        if (data.success) {
          setReviews((prevReviews) => [...prevReviews, data.review]);
          setFormData({
            reviewText: "",
            carModel: "",
            carBrand: "",
            carYear: "",
            rating: "0",
            imgFile: null,
          });
          setMessage("Review submitted successfully!");
        } else {
          setMessage(data.message || "Error submitting the review");
        }
      } catch (error) {
        console.error("There was an issue saving the review:", error);
        setMessage("There was an error. Please try again.");
      }
    } else {
      setMessage(
        "Please fill in all fields, upload an image, and provide a valid rating (1-5)."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Note: we're sending the ID now
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.message || "Error deleting the review");
      }

      setMessage("Review deleted successfully!");
      setReviews(
        (prevReviews) => prevReviews.filter((review) => review.id !== id) // filter by ID
      );
    } catch (error) {
      console.error("There was an issue deleting the review:", error);
      setMessage("There was an error. Please try again.");
    }
  };
  const handleEdit = (review) => {
    setEditFormData({
      reviewText: review.comment,
      carModel: review.car_model,
      carBrand: review.car_brand,
      carYear: review.car_year.toString(),
      rating: review.rating.toString(),
      imgFile: null,
    });
    setEditingReview(review.id);
  };
  const handleUpdate = async (reviewId) => {
    console.log("State or Prop ID:", reviewId);
    console.log("Edit Form Data:", editFormData);

    const patchData = {
      id: reviewId,
      car_model: editFormData.carModel,
      car_brand: editFormData.carBrand,
      car_year: editFormData.carYear,
      comment: editFormData.reviewText,
      rating: editFormData.rating,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/reviews/update/${reviewId}`,
        {
          method: "PATCH", // Change to PATCH
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
          body: JSON.stringify(patchData), // Send data as JSON
        }
      );

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      let data;
      if (
        response.status !== 204 &&
        response.headers.get("content-length") > 0
      ) {
        data = await response.json();
        if (data.success) {
          setReviews((prevReviews) =>
            prevReviews.map((r) => (r.id === reviewId ? data.review : r))
          );
          setEditingReview(null);
          setMessage("Review updated successfully!");
        } else {
          setMessage(data.message || "Error updating the review");
        }
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setMessage("Error updating the review: " + error.message);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1 className="profile">Profile</h1>
      <p className="welcome-message">Welcome, {username}!</p>

      <Logout
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setShowLogoutMessage={setShowLogoutMessage}
      />

      <h2>Write a Review</h2>

      <label>
        Car Model:
        <input
          type="text"
          name="carModel"
          value={formData.carModel}
          onChange={handleChange}
          placeholder="Enter car model"
        />
      </label>

      <label>
        Car Brand:
        <input
          type="text"
          name="carBrand"
          value={formData.carBrand}
          onChange={handleChange}
          placeholder="Enter car brand"
        />
      </label>

      <label>
        Car Year:
        <input
          type="number"
          name="carYear"
          value={formData.carYear}
          onChange={handleChange}
          placeholder="Enter car year"
        />
      </label>

      <label>
        Review:
        <textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Write your review here..."
          rows="10"
          cols="50"
        />
      </label>

      <label>
        Upload Image:
        <input type="file" name="imgFile" onChange={handleFileChange} />
      </label>

      <br />

      <label>
        Rating:
        <select name="rating" value={formData.rating} onChange={handleChange}>
          <option value="0">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <br />

      <button onClick={submitReview}>Submit Review</button>

      {message && <p>{message}</p>}

      <h2>Your Reviews</h2>
      <ul>
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <li className="review" key={review.id}>
              {editingReview === review.id ? (
                <div>
                  <label>
                    Car Model:
                    <input
                      type="text"
                      name="carModel"
                      value={editFormData.carModel}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Car Brand:
                    <input
                      type="text"
                      name="carBrand"
                      value={editFormData.carBrand}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Car Year:
                    <input
                      type="number"
                      name="carYear"
                      value={editFormData.carYear}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Review:
                    <textarea
                      name="reviewText"
                      value={editFormData.reviewText}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Rating:
                    <select
                      name="rating"
                      value={editFormData.rating}
                      onChange={handleEditChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </label>
                  <button onClick={() => handleUpdate(review.id)}>
                    Update Review
                  </button>
                  <button onClick={() => setEditingReview(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div>
                    <strong>Car Model:</strong> {review.car_model}
                  </div>
                  <div>
                    <strong>Car Brand:</strong> {review.car_brand}
                  </div>
                  <div>
                    <strong>Car Year:</strong> {review.car_year}
                  </div>
                  <div>
                    <strong>Rating:</strong> {review.rating}
                  </div>
                  <div>
                    <strong>Review:</strong> {review.comment}
                  </div>
                  <button onClick={() => handleDelete(review.id)}>
                    Delete Review
                  </button>
                  <button onClick={() => handleEdit(review)}>
                    Edit Review
                  </button>
                  <img
                    src={review.imgpath}
                    alt={`Image of ${review.car_model}`}
                  />
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;

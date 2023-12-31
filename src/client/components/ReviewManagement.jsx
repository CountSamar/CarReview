import React, { useState, useEffect } from 'react';
import "../Reviewman.css"
const BACKEND_URL = "http://localhost:5001";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    reviewText: "",
    carModel: "",
    carBrand: "",
    carYear: "",
    rating: "0",
  });

  useEffect(() => {
    const fetchAdminReviews = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/reviews/admin`);

        const data = await response.json();

        if (!response.ok || !Array.isArray(data.data)) {
          throw new Error(data.message || "Unexpected response from server");
        }

        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews for management:", error);
        setMessage(`Error fetching reviews: ${error.message}`);
      }
    };

    fetchAdminReviews();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unexpected response from server");
      }

      setMessage("Review deleted successfully!");
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
      setMessage(`Error: ${error.message}`);
    }
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
    <div className="review-management-container" style={{ marginTop: '2rem' }}>
      <h1 className="review-management-header">Review Management</h1>
  
      {message && <p className="review-management-message">{message}</p>}
  
      <h2 className="review-list-header">All Reviews</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li className="review-item" key={review.id}>
            {editingReview === review.id ? (
              <div className="review-edit-form">
                <textarea className="review-textarea" name="reviewText" value={editFormData.reviewText} onChange={handleEditChange} />
                <input className="review-input" type="text" name="carModel" value={editFormData.carModel} onChange={handleEditChange} />
                <input className="review-input" type="text" name="carBrand" value={editFormData.carBrand} onChange={handleEditChange} />
                <input className="review-input" type="text" name="carYear" value={editFormData.carYear} onChange={handleEditChange} />
                <input className="review-input" type="text" name="rating" value={editFormData.rating} onChange={handleEditChange} />
                <button className="btn btn-save" onClick={() => handleUpdate(review.id)}>Save</button>
                <button className="btn btn-cancel" onClick={() => setEditingReview(null)}>Cancel</button>
              </div>
            ) : (
              <div className="review-display">
                <p className="review-comment">{review.comment}</p>
                <p className="review-car-model">{review.car_model}</p>
                <p className="review-car-brand">{review.car_brand}</p>
                <p className="review-car-year">{review.car_year}</p>
                <p className="review-rating">{review.rating}</p>
                <button className="btn btn-delete" onClick={() => handleDelete(review.id)}>
                  Delete Review
                </button>
                <button className="btn btn-edit" onClick={() => {
                  setEditFormData({
                    reviewText: review.comment,
                    carModel: review.car_model,
                    carBrand: review.car_brand,
                    carYear: review.car_year.toString(),
                    rating: review.rating.toString(),
                  });
                  setEditingReview(review.id);
                }}>
                  Edit Review
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewManagement;
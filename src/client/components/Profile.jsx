import React, { useState, useEffect} from "react";
import Logout from "./Logout";

const Profile = ({ username, setToken, setIsLoggedIn, setShowLogoutMessage }) => {
    const [formData, setFormData] = useState({
        reviewText: "",
        carModel: "",
        carBrand: "",
        carYear: "",
        rating: "0",
        imgFile: null
    });
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/reviews/user/${username}`);
                const data = await response.json();
    
                if (!response.ok) {
                    const errorMessage = data && data.message ? data.message : "Error fetching reviews";
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
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            imgFile: e.target.files[0]
        }));
    };

    const submitReview = async () => {
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
                formSubmission.append('user_name', username);
                formSubmission.append('carModel', carModel);
                formSubmission.append('carBrand', carBrand);
                formSubmission.append('carYear', carYear);
                formSubmission.append('comment', reviewText);
                formSubmission.append('imgpath', imgFile);
                formSubmission.append('rating', rating);

                const response = await fetch("http://localhost:5001/api/reviews/create", {
                    method: "POST",
                    body: formSubmission,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Error submitting the review");
                }

                if (data.success) {
                    setReviews(prevReviews => [...prevReviews, reviewText]);
                    setFormData({
                        reviewText: "",
                        carModel: "",
                        carBrand: "",
                        carYear: "",
                        rating: "0",
                        imgFile: null
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
            setMessage("Please fill in all fields, upload an image, and provide a valid rating (1-5).");
        }
    };
    const handleDelete = async (date_created) => {
        try {
            const response = await fetch('http://localhost:5001/api/reviews/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, date_created })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error deleting the review");
            }

            setMessage("Review deleted successfully!");
            setReviews(prevReviews => prevReviews.filter(review => review.date_created !== date_created));
        } catch (error) {
            console.error("There was an issue deleting the review:", error);
            setMessage("There was an error. Please try again.");
        }
    };
    return (
        <div style={{ marginTop: "2rem" }}>
            <h1>Profile</h1>
            <p>Welcome, {username}!</p>

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

            <button onClick={submitReview}>
                Submit Review
            </button>

            {message && <p>{message}</p>}

            <h2>Your Reviews</h2>
            <ul>
                {reviews.map((review,index) => (
                    <li className= "review" key={index}>
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
                        <button onClick={() => handleDelete(review.date_created)}>Delete Review</button>
                        <img src={`http://localhost:5001/${review.imgpath}`} alt={`Image of ${review.car_model}`} />

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
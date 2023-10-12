import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";
import { Base64 } from 'js-base64';

const Profile = ({ username, setToken, setIsLoggedIn, setShowLogoutMessage }) => {
    const [reviewText, setReviewText] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carYear, setCarYear] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState(null);
    const [rating, setRating] = useState(0);

    const fetchReviews = async (role, id) => {
        if (role === "admin") {
            const response = await fetch("/api/reviews/admin", {
                method: "GET",
            });
            const data = await response.json();
            setReviews(data)
        } else {
            const response = await fetch(`/api/reviews/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            setReviews(data)
        }
    }

    useEffect(() => {
        // console.log(Base64.btoa(localStorage.getItem("token")))
        let tok = Base64.btoa(localStorage.getItem("token"))
        console.log(tok, "tok")
        // const mytokenId = jwt_decode(localStorage.getItem("token").id)
        // const mytokenrole = jwt_decode(localStorage.getItem("token").role)

        // fetchReviews(mytokenrole, mytokenId)

    }, [])


    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value, 10));
    };

    const submitReview = async () => {
        setMessage(null);

        if (
            reviewText.trim() &&
            carModel.trim() &&
            carBrand.trim() &&
            carYear.trim() &&
            imgFile &&
            rating >= 1 &&
            rating <= 5
        ) {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('carModel', carModel);
                formData.append('carBrand', carBrand);
                formData.append('carYear', carYear);
                formData.append('comment', reviewText);
                formData.append('imgpath', imgFile);
                formData.append('rating', rating);

                const response = await fetch("/api/reviews/create", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    setReviews((prevReviews) => [...prevReviews, reviewText]);
                    setReviewText("");
                    setCarModel("");
                    setCarBrand("");
                    setCarYear("");
                    setRating(0);
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

            <input
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Enter car model"
            />

            <input
                type="text"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                placeholder="Enter car brand"
            />

            <input
                type="number"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                placeholder="Enter car year"
            />

            <textarea
                value={reviewText}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
                rows="10"
                cols="50"
            />

            <input type="file" onChange={handleFileChange} />

            <br />

            {/* Add a rating input */}
            <select value={rating} onChange={handleRatingChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <br />

            <button onClick={submitReview}>
                Submit Review
            </button>

            {message && <p>{message}</p>}

            <h2>Your Reviews</h2>
            <ul>
                {reviews.length > 0 && reviews.map((rev, index) => (
                    <li key={index}>{rev.comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbWlseUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NzA4Mjc1NywiZXhwIjoxNjk3Njg3NTU3fQ.olkCq8agMIjQsbwAuzaCsoYLwJfJCd2V1kJjMOXHjko


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbWlseUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NzA4Mjc1NywiZXhwIjoxNjk3Njg3NTU3fQ.olkCq8agMIjQsbwAuzaCsoYLwJfJCd2V1kJjMOXHjko
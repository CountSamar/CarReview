import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function ReviewCard({ review }) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [role, setRole] = useState("")

    const navigate = useNavigate()


    useEffect(() => {
     console.log(jwt_decode(token).role, "my role")
        setRole(jwt_decode(token).role)
     
    }, [])
    
    return (
        <div className="review-card" >
            <h3>Rating: {review.rating}</h3>
            <h3>Review: {review.description}</h3>
            <h3>Vehicle Type: {review.vehicle_type}</h3>
            <img src={review.image} alt={review.vehicle_type} />
            {role === 'admin' ?  <>
                <h1>My role is: {role}</h1>
                <button onClick={handleNav}>Log Me In</button>
            </> : <>
            <h1>No role</h1>
            </>
            }
        </div>
    )
}
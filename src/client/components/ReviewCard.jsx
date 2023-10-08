import React from 'react'
import LikeButton from './LikeButton'


export default function ReviewCard({ review }) {
    return (
        <div className="review-card" >
            <h3>Rating: {review.rating}</h3>
            <h3>Review: {review.description}</h3>
            <h3>Vehicle Type: {review.vehicle_type}</h3>
            <img src={review.image} alt={review.vehicle_type} />
            <LikeButton />
        </div>
    )
}
const express = require('express');
const router = express.Router();


const {
    getAllReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview,
    getLatestReviews
} = require('../../db/reviews');

// Fetch all reviews
router.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.json({ success: true, data: reviews });
    } catch (err) {
        next(err);
    }
});
// Fetch the latest five reviews
router.get('/latest', async (req, res, next) => {
    try {
        const reviews = await getLatestReviews();
        res.json({ success: true, data: reviews });
    } catch (err) {
        next(err);
    }
});

// Fetch a specific review by its ID
router.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.reviewId);
        if (review) {
            res.json({ success: true, data: review });
        } else {
            res.status(404).json({ success: false, message: "Review not found" });
        }
    } catch (err) {
        next(err);
    }
});

// Add a new review for a specific car
router.post('/car/:carId', async (req, res, next) => {
    try {
        
        const newReview = await addReview({
            carId: req.params.carId,
            reviewText: req.body.reviewText,
            reviewerName: req.body.reviewerName
           
        });
        res.status(201).json({ success: true, data: newReview });
    } catch (err) {
        next(err);
    }
});

// Update review details
router.put('/:reviewId', async (req, res, next) => {
    try {
        const updatedReview = await updateReview(req.params.reviewId, req.body);
        if (updatedReview) {
            res.json({ success: true, data: updatedReview });
        } else {
            res.status(404).json({ success: false, message: "Review not found" });
        }
    } catch (err) {
        next(err);
    }
});

// Delete a review
router.delete('/:reviewId', async (req, res, next) => {
    try {
        const result = await deleteReview(req.params.reviewId);
        if (result) {
            res.json({ success: true, message: "Review deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Review not found" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

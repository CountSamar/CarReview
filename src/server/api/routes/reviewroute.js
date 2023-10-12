const express = require('express');
const router = express.Router();
const upload = require('./multer')


const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getLatestReviews
} = require('../../db/reviews');

// Fetch all reviews
router.get('/', async (req, res, next) => {
    try {
        console.log(req)
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

// Create review endpoint
router.post('/create', upload.single('imgpath'), async (req, res) => {
    console.log("Received data from frontend:", req.body);

    // Extract data from the body and the file path from multer's file object
    const { username, carModel, carBrand, carYear, comment, rating } = req.body;
    const imgPath = req.file ? req.file.path : null;

    if (!username || !carModel || !carBrand || !carYear || !comment || !imgPath || rating === undefined) {
        return res.status(400).json({ success: false, message: 'All fields including image and rating are required.' });
    }

    try {
        const review = await createReview({ username, carModel, carBrand, carYear, comment, imgPath, rating });
        res.json({ success: true, review });
    } catch (err) {
        console.error("Error while creating review:", err);
        res.status(500).json({ success: false, message: 'Failed to create review', error: err.message });
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

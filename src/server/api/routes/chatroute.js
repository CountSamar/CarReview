const express = require('express');
const router = express.Router();
const {
    addComment,
    getCommentsForReview,
} = require('../../db/chats');

// Endpoint to add a new comment
router.post('/add', async (req, res) => {  
    const { reviewId, userName, commentText } = req.body;

    if (!reviewId || !userName || !commentText) {
        return res.status(400).json({ error: "Required fields: reviewId, userName, commentText" });
    }

    try {
        const comment = await addComment({ reviewId, userName, commentText });
        res.status(201).json(comment);  // Returning 201 for resource creation
    } catch (err) {
        console.error("Error adding comment:", err);  
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to get comments for a review
router.get('/for-review/:reviewId', async (req, res) => {  
    const reviewId = parseInt(req.params.reviewId, 10);

    if (isNaN(reviewId)) {
        return res.status(400).json({ error: "Valid review ID is required" });
    }

    try {
        const comments = await getCommentsForReview(reviewId);
        res.json({ success: true, data: comments });
    } catch (err) {
        console.error("Error fetching comments for review:", err);  
        res.status(500).json({ error: "Internal server error" });
    }
});

// ... (Add other chat-related endpoints as needed)

module.exports = router;
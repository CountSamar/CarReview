require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { addComment, getCommentsForReview, deleteComment, getCommentById} = require('../../db/chats');
const JWT_SECRET = process.env.JWT_SECRET;

// Define the function to decode a JWT token
function decodeToken(authorizationHeader) {
    if (!authorizationHeader) return null;
    const token = authorizationHeader.split(' ')[1];

    console.log("JWT Secret:", JWT_SECRET);  
    console.log("Token to verify:", token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded JWT payload:', decoded);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}


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


// Endpoint to delete a comment
router.delete('/delete/:chat_id', async (req, res) => {
    // Decode JWT to get the user_name
    const decodedPayload = decodeToken(req.headers.authorization);
    if (!decodedPayload || !decodedPayload.user_name) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
    }
    const requestingUserName = decodedPayload.user_name;

    try {
        const comment = await getCommentById(req.params.chat_id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Check if the comment's user_name matches the user_name from the JWT
        if (comment.user_name === requestingUserName) {
            // Call deleteComment with both chat_id and requestingUserName
            await deleteComment(req.params.chat_id, requestingUserName);
            res.json({ success: true, message: "Comment deleted" });
        } else {
            return res.status(403).json({ error: "Forbidden: You don't have permission to delete this comment" });
        }
    } catch (error) {
        console.error("Failed to delete comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;


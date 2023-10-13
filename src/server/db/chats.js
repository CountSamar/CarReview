const db = require("./client");

// Inserting a new comment
const addComment = async ({ reviewId, userName, commentText }) => {
    try {
        const {
            rows: [comment],
        } = await db.query(
            `
            INSERT INTO chats(review_id, user_name, comm)
            VALUES($1, $2, $3)
            RETURNING *`,
            [reviewId, userName, commentText]
        );

        return comment;
    } catch (err) {
        throw err;
    }
};

// Fetching comments for a review
const getCommentsForReview = async (reviewId) => {
    try {
        const { rows } = await db.query(
            `
            SELECT review_id, user_name, comm FROM chats
            WHERE review_id = $1
            ORDER BY review_id DESC`, 
            [reviewId]  // Passing reviewId as the argument for $1
        );

        return rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    addComment,
    getCommentsForReview,
};

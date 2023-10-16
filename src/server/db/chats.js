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
            RETURNING chat_id, review_id, user_name, comm`,  // Added chat_id here
            [reviewId, userName, commentText]
        );

        return comment;
    } catch (err) {
        throw err;
    }
};
const getCommentById = async (chat_id) => {
    try {
        const { rows: [comment] } = await db.query(
            `
            SELECT chat_id, review_id, user_name, comm FROM chats
            WHERE chat_id = $1`,
            [chat_id]
        );

        if (!comment) {
            throw new Error('Comment not found');
        }

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
            SELECT chat_id, review_id, user_name, comm FROM chats  
            WHERE review_id = $1
            ORDER BY chat_id DESC`,  // Also changed the ordering to be by chat_id for a clearer context
            [reviewId]
        );

        return rows;
    } catch (err) {
        throw err;
    }
};


const deleteComment = async (chat_id, requestingUserName) => {
    try {
        console.log("Deleting comment with chat_id:", chat_id);
        console.log("Requesting user:", requestingUserName);

        const { rowCount, rows } = await db.query(
            `
            DELETE FROM chats WHERE chat_id = $1 AND user_name = $2 
            RETURNING chat_id, user_name`, 
            [chat_id, requestingUserName]
        );

        console.log("Delete operation result - rowCount:", rowCount);

        if (rowCount === 0) {
            // Check if the chat_id even exists, regardless of user_name
            const result = await db.query('SELECT user_name FROM chats WHERE chat_id = $1', [chat_id]);
            console.log("Result of SELECT query:", result.rows);

            if (result.rowCount === 0) {
                throw new Error('Comment not found');
            } else {
                throw new Error('Not authorized to delete this comment');
            }
        }

        return rowCount > 0;  
    } catch (err) {
        console.error("Error in deleteComment:", err);
        throw err;
    }
};



module.exports = {
    addComment,
    getCommentsForReview,
    deleteComment,
    getCommentById 
};

const db = require('./client');

const createReview = async({ car_id, user_id, rating, comment }) => {
    try {
        const { rows: [review] } = await db.query(`
            INSERT INTO reviews(car_id, user_id, rating, comment)
            VALUES($1, $2, $3, $4)
            RETURNING *`, [car_id, user_id, rating, comment]);

        return review;
    } catch (err) {
        throw err;
    }
}

const getAllReviews = async() => {
    try {
        const { rows } = await db.query(`
            SELECT * 
            FROM reviews`);

        return rows;
    } catch (err) {
        throw err;
    }
}

const getReviewById = async(id) => {
    try {
        const { rows: [ review ] } = await db.query(`
            SELECT * 
            FROM reviews
            WHERE id=$1;`, [ id ]);

        if(!review) {
            return;
        }
        return review;
    } catch (err) {
        throw err;
    }
}

const updateReview = async(id, { car_id, user_id, rating, comment }) => {
    try {
        const { rows: [review] } = await db.query(`
            UPDATE reviews
            SET car_id = $2, user_id = $3, rating = $4, comment = $5
            WHERE id = $1
            RETURNING *`, [id, car_id, user_id, rating, comment]);

        return review;
    } catch (err) {
        throw err;
    }
}

const deleteReview = async(id) => {
    try {
        await db.query(`
            DELETE FROM reviews
            WHERE id=$1;`, [ id ]);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};

const db = require('./client');

// Helper function to get user_id from username
const getUserIdFromUsername = async (username) => {
    const { rows: [user] } = await db.query(`
        SELECT id FROM users WHERE username = $1
    `, [username]);

    if (!user) {
        throw new Error('User not found');
    }

    return user.id;
};
const createReview = async({ username, carModel, carBrand, carYear, comment, imgPath, rating }) => {
    try {
        console.log('Image path received:', imgPath);

        const { rows: [review] } = await db.query(`
            INSERT INTO reviews(username, car_model, car_brand, car_year, comment, imgpath, rating)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`, [username, carModel, carBrand, carYear, comment, imgPath, rating]);

        return review;
    } catch (err) {
        throw err;
    }
}



const getAllReviews = async() => {
    try {
        const { rows } = await db.query(`
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
        `);
        return rows;
    } catch (err) {
        throw err;
    }
}

const getReviewById = async(id) => {
    try {
        const { rows: [ review ] } = await db.query(`
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.id=$1;
        `, [ id ]);

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

const getLatestReviews = async () => {
    try {
        const query = `
            SELECT 
                r.id, 
                r.rating, 
                r.comment, 
                r.date_created, 
                u.name as user_name,
                c.model,
                c.brand,
                c.year,
                c.image_path as car_image
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            JOIN cars c ON r.car_id = c.id   
            ORDER BY r.date_created DESC
            LIMIT 5
        `;

        const { rows } = await db.query(query);
        
        return rows;
    } catch (err) {
        console.error("Error in getLatestReviews:", err); 
        throw err;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getLatestReviews 
};

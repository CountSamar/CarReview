const db = require("./client");

const createReview = async ({
  username,
  carModel,
  carBrand,
  carYear,
  comment,
  imgPath,
  rating,
}) => {
  try {
    const {
      rows: [review],
    } = await db.query(
      `
            INSERT INTO reviews(user_name, car_model, car_brand, car_year, comment, imgpath, rating)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
      [username, carModel, carBrand, carYear, comment, imgPath, rating]
    );

    return review;
  } catch (err) {
    throw err;
  }
};
const getAllReviews = async () => {
    try {
      const { rows } = await db.query(`
        SELECT 
          rating, 
          comment, 
          date_created, 
          imgpath, 
          user_name, 
          car_model,  
          car_brand,  
          car_year    
        FROM reviews
      `);
  
      return rows;
    } catch (err) {
      throw err;
    }
  };
  

const getReviewsByUsername = async (username) => {
  try {
    const { rows } = await db.query(
      `
        SELECT * FROM reviews
        WHERE user_name = $1
      `,
      [username]
    );

    return rows;
  } catch (err) {
    throw err;
  }
};

const getLatestReviews = async () => {
    try {
        const query = `
            SELECT 
                rating,
                comment,
                date_created,
                imgpath,
                user_name,
                car_model,
                car_brand,
                car_year
            FROM reviews
            ORDER BY date_created DESC
            LIMIT 5;
        `;

        const { rows } = await db.query(query);

        return rows;
    } catch (err) {
        console.error("Error in getLatestReviews:", err);
        throw err;
    }
};
const deleteReview = async (username, date_created) => {
  try {
    const { rowCount } = await db.query(
      `
        DELETE FROM reviews
        WHERE user_name = $1 AND date_created = $2
      `,
      [username, date_created]
    );

    if (rowCount === 0) {
      throw new Error('Review not found');
    }

    return true;
  } catch (err) {
    throw err;
  }
};


module.exports = {
  createReview,
  getAllReviews,
  deleteReview,

  getLatestReviews,
  getReviewsByUsername,
};

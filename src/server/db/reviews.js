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
const getAllReviews = async (id) => {
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
            WHERE user.id = $1
        `, [id]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAdminAllReviews = async () => {
  try {
    const { rows } = await db.query(`
            SELECT *
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
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.user_id=$1;
        `,
      [id]
    );

    return rows;
  } catch (err) {
    throw err;
  }
};
const getLatestReviews = async (limit = 10) => {
  try {
    const query = `
            SELECT 
                id,
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
            LIMIT $1;  
        `;

    const { rows } = await db.query(query, [limit]); // pass the limit

    return rows;
  } catch (err) {
    console.error("Error in getLatestReviews:", err);
    throw err;
  }
};


const deleteReview = async (id) => {
  try {
    const { rowCount } = await db.query(
      `DELETE FROM reviews WHERE id = $1 RETURNING *`,
      [id]
    );

    // Check if any row was deleted
    if (rowCount === 0) {
      throw new Error("Review not found");
    }
  } catch (err) {
    console.error("Error in deleteReview:", err);
    throw err;
  }
};
const updateReview = async (data) => {
  console.log('Updating review with data:', data);

  if (!data.id) {
      throw new Error("The 'id' field must be provided to update a review.");
  }

  const fields = ['comment', 'rating', 'car_model', 'car_brand', 'car_year'];
  const setClauses = [];
  const values = [data.id];

  fields.forEach((field, index) => {
      if (data[field]) {
          setClauses.push(`${field} = $${index + 2}`);  // +2 because id will be $1
          values.push(data[field]);
      }
  });

  if (setClauses.length === 0) {
      throw new Error("No valid fields provided for update.");
  }

  const queryString = `
      UPDATE reviews 
      SET ${setClauses.join(', ')}
      WHERE id = $1
      RETURNING *;
  `;

  try {
      const {
          rows: [review],
      } = await db.query(queryString, values);
      return review;
  } catch (err) {
      throw err;
  }
};

const getAdminAllReviews = async () => {
  try {
    const { rows } = await db.query(`
            SELECT *
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

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  getAdminAllReviews,
  getLatestReviews,
  getAdminAllReviews,
  getReviewsByUsername
  getReviewsByUsername,
};

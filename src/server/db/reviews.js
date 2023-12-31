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
const getAllReviews = async (carModel, carYear, carBrand) => {
  try {
    // Construct the base query
    let query = `
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
    `;

    const queryParams = [];

    // Add WHERE clauses for filtering based on provided parameters
    if (carModel) {
      query += ` WHERE car_model = $1`;
      queryParams.push(carModel);
    }

    if (carYear) {
      if (queryParams.length > 0) {
        query += ` AND car_year = $${queryParams.length + 1}`;
      } else {
        query += ` WHERE car_year = $1`;
      }
      queryParams.push(carYear);
    }

    if (carBrand) {
      if (queryParams.length > 0) {
        query += ` AND car_brand = $${queryParams.length + 1}`;
      } else {
        query += ` WHERE car_brand = $1`;
      }
      queryParams.push(carBrand);
    }

    const { rows } = await db.query(query, queryParams);

    return rows;
  } catch (err) {
    throw err;
  }
};

const getFilteredAdminReviews = async (carModel, carYear, carBrand) => {
  try {
    // Define the base query
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
      WHERE
        ($1::text IS NULL OR car_model = $1::text)
        AND ($2::text IS NULL OR car_year = $2::text)
        AND ($3::text IS NULL OR car_brand = $3::text)
      ORDER BY date_created DESC;
    `;

    // Execute the query with the provided filtering criteria
    const { rows } = await db.query(query, [carModel, carYear, carBrand]);

    return rows;
  } catch (err) {
    console.error("Error in getFilteredAdminReviews:", err);
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
const searchReviews = async (searchTerm) => {
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
      WHERE 
        comment ILIKE $1 OR
        user_name ILIKE $1 OR
        car_model ILIKE $1 OR
        car_brand ILIKE $1 OR
        car_year::TEXT ILIKE $1
      ORDER BY date_created DESC;
    `;

    const value = `%${searchTerm}%`;  // Wrapping the searchTerm with % for wildcard search
    const { rows } = await db.query(query, [value]);
    return rows;
  } catch (err) {
    console.error("Error in searchReviews:", err);
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
  getReviewsByUsername,
  searchReviews, 
  getFilteredAdminReviews,
};
const express = require("express");
const router = express.Router();
const upload = require("../multer");

const {
  getAllReviews,
  deleteReview,

  createReview,

  getLatestReviews,
  getReviewsByUsername,
} = require("../../db/reviews");

// Fetch all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
});
// Fetch the latest five reviews
router.get("/latest", async (req, res, next) => {
  try {
    const reviews = await getLatestReviews();
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
});

router.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const reviews = await getReviewsByUsername(username);
    if (reviews && reviews.length > 0) {
      res.json(reviews);
    } else {
      res
        .status(404)
        .send({
          success: false,
          message: `No reviews found for user ${username}`,
        });
    }
  } catch (error) {
    console.error("Error fetching reviews for user:", error);
    res
      .status(500)
      .send({
        success: false,
        message: `Error fetching reviews for user ${username}. Reason: ${error.message}`,
      });
  }
});
// Create review endpoint
router.post("/create", upload.single("imgpath"), async (req, res) => {
  console.log("Received data from frontend:", req.body);
  console.log("File Data:", req.file);
  console.log("Form Data:", req.body);

  // Extract data from the body and the file path from multer's file object
  const { user_name, carModel, carBrand, carYear, comment, rating } = req.body;
  const imgPath = req.file ? req.file.path : null;

  if (
    !user_name ||
    !carModel ||
    !carBrand ||
    !carYear ||
    !comment ||
    !imgPath ||
    rating === undefined
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "All fields including image and rating are required.",
      });
  }

  try {
    const review = await createReview({
      username: user_name,
      carModel,
      carBrand,
      carYear,
      comment,
      imgPath,
      rating,
    });
    res.json({ success: true, review });
  } catch (err) {
    console.error("Error while creating review:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create review",
        error: err.message,
      });
  }
});
router.delete('/delete', async (req, res) => {
  try {
      const { username, date_created } = req.body;

      // Basic validation can be added for username and date_created

      await deleteReview(username, date_created);
      
      res.json({ success: true, message: "Review deleted successfully!" });
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;

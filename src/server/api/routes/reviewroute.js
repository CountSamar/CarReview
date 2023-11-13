const express = require("express");
const router = express.Router();
const { upload, uploadFileToS3 } = require("../multer");

const {
  getAllReviews,
  deleteReview,
  createReview,
  updateReview,
  getAdminAllReviews,
  getLatestReviews,
  getFilteredAdminReviews,
  getReviewsByUsername,
  searchReviews,
} = require("../../db/reviews");

// Fetch Admin All Reviews
router.get("/admin", async (req, res, next) => {
  try {
    const reviews = await getAdminAllReviews();
    let message = reviews.length > 0 ? "Reviews found" : "No reviews found";
    res.json({ message: message, data: reviews });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/filtered", async (req, res, next) => {
  try {
    const { carModel, carYear, carBrand } = req.query;
    const reviews = await getFilteredAdminReviews(carModel, carYear, carBrand);
    let message = reviews.length > 0 ? "Reviews found" : "No reviews found";
    res.json({ message: message, data: reviews });
  } catch (err) {
    next(err);
  }
});

// Fetch all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    let message = reviews.length > 0 ? "Reviews found" : "No reviews found";
    res.json({ success: true, message: message, data: reviews });
  } catch (err) {
    next(err);
  }
});

// Fetch the latest 10 reviews
router.get("/latest", async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const reviews = await getLatestReviews(limit);
    let message = reviews.length > 0 ? "Reviews found" : "No reviews found";
    res.json({ success: true, message: message, data: reviews });
  } catch (err) {
    next(err);
  }
});

router.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const reviews = await getReviewsByUsername(username);
    if (reviews && reviews.length > 0) {
      res.json({ success: true, data: reviews });
    } else {
      res.status(404).send({
        success: false,
        message: `No reviews found for user with the username ${username}`,
      });
    }
  } catch (error) {
    console.error("Error fetching reviews for user:", error);
    res.status(500).send({
      success: false,
      message: `Error fetching reviews for user with the username ${username}. Reason: ${error.message}`,
    });
  }
});

router.post("/create", upload.single('imgpath'), async (req, res) => {
  console.log("Received data from frontend:", req.body);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required.",
    });
  }

  const { user_name, carModel, carBrand, carYear, comment, rating } = req.body;

  if (!user_name || !carModel || !carBrand || !carYear || !comment || rating === undefined) {
    return res.status(400).json({
      success: false,
      message: "All fields including image and rating are required.",
    });
  }

  try {
    const uploadResult = await uploadFileToS3(req.file);
    let imgPath = uploadResult.Location;
    
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
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: err.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await deleteReview(id);
    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "REVIEW_NOT_FOUND",
          message: `Review with ID '${id}' not found.`,
        },
      });
    }
    res.json({ success: true, message: "Review deleted successfully!" });
  // ... previous code

} catch (err) {
  console.error("Error while deleting review:", err);
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal error occurred. Please try again later.",
    },
  });
}
});

router.patch("/update/:id", async (req, res) => {
const { id } = req.params;
const { comment, rating, carModel, carBrand, carYear } = req.body;

try {
  const updatedReview = await updateReview({
    id,
    comment,
    rating,
    car_model: carModel,
    car_brand: carBrand,
    car_year: carYear,
  });

  if (updatedReview) {
    res.status(200).json({ success: true, review: updatedReview });
  } else {
    res.status(404).json({ success: false, message: "Review not found." });
  }
} catch (error) {
  console.error("Error updating review:", error);
  res.status(500).json({ success: false, message: "Failed to update review." });
}
});

router.get("/search", async (req, res) => {
const searchTerm = req.query.term;

if (!searchTerm) {
  return res.status(400).json({ success: false, error: "Search term is required." });
}

try {
  const results = await searchReviews(searchTerm);
  res.json({ success: true, data: results });
} catch (err) {
  res.status(500).json({ success: false, error: "Database error" });
}
});

module.exports = router;


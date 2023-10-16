const express = require("express");
const router = express.Router();
const upload = require("../multer");

const jwt = require("jsonwebtoken");

const {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  validateUser,
} = require("../../db/users");

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_FALLBACK_SECRET";

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

// Fetch a specific user by ID
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUser(req.params.userId);
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

// Register a new user
router.post(
  "/register",
  upload.single("profilePicture"),
  async (req, res, next) => {
    try {
      const userData = req.body;
      if (req.file) {
        userData.profilePicPath = req.file.path;
      }

      const newUser = await createUser(userData);
      res.status(201).json({ success: true, data: newUser });
    } catch (err) {
      next(err);
    }
  }
);

// Login a user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);

    if (user) {
      const payload = {
        userId: user.id,
        email: user.email,
        user_name: user.username, // Include the user_name in the payload
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      res.json({ success: true, token, username: user.username });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});


// Update user details
router.put(
  "/:userId",
  upload.single("profilePicture"),
  async (req, res, next) => {
    try {
      const userData = req.body;
      if (req.file) {
        userData.profilePicPath = req.file.path;
      }

      const updatedUser = await updateUser(req.params.userId, userData);
      if (updatedUser) {
        res.json({ success: true, data: updatedUser });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Delete a user
router.delete("/:userId", async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.userId);
    if (result) {
      res.json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
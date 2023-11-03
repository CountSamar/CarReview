const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins for CORS.
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5001",
  "https://carreviewweb.onrender.com"
];

// CORS middleware setup.
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin like mobile apps or curl requests.
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// JSON and URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging HTTP requests
app.use(morgan('combined'));

// API routes
const userRoutes = require("./routes/userroutes");
const carRoutes = require("./routes/carroute");
const reviewRoutes = require("./routes/reviewroute");
const chatRoutes = require("./routes/chatroute");

// Use the API routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chats", chatRoutes);

// Serve static files from the React app build directory
const distDir = path.join(__dirname, '..', '..', '..', 'dist');
console.log(`Serving static files from: ${distDir}`);
app.use(express.static(distDir));

// Serve static files from the uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
console.log(`Serving uploads from: ${uploadsDir}`);
app.use("/uploads", express.static(uploadsDir));

// Handle requests for non-existent files in the uploads directory
app.use("/uploads", function(req, res) {
  res.status(404).send('File not found');
});

// Fallback route for handling SPA client-side routing. Must be below static file serving.
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  console.error("Error object:", err);
  res.status(500).send({ success: false, message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

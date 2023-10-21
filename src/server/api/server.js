const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins for CORS.
const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:5001", 
  "https://carreviewweb.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);  // Allow requests with no origin like mobile apps or curl requests.
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const userRoutes = require("./routes/userroutes");
const carRoutes = require("./routes/carroute");
const reviewRoutes = require("./routes/reviewroute");
const chatRoutes = require("./routes/chatroute");

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chats", chatRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Route to handle any requests to unhandled endpoints
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..',  'dist', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));


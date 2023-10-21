const express = require("express");
const cors = require("cors");
const path = require("path");


const PORT = 5001;


const userRoutes = require("./routes/userroutes");
const carRoutes = require("./routes/carroute");
const reviewRoutes = require("./routes/reviewroute");
const chatRoutes = require("./routes/chatroute");

const app = express();

// List of allowed origins for CORS.
const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:5001", 
  "https://carreviewweb.onrender.com"
];


app.use(
  cors({
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
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit!");
  res.json({ message: "This is a test message from the server" });
});

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chats", chatRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});


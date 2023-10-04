const express = require("express");
const app = express();
const PORT = 3000;

const pool = require("../db/client.js");

// Route for fetching users
app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    console.log("Retrieved Users:", rows); // This will print the list of users to the console.
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route for fetching cars
app.get("/api/cars", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cars");
    console.log("Retrieved Cars:", rows); // This will print the list of cars to the console.
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
app.get("/api/reviews", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM reviews");
    console.log("Retrieved Reviews:", rows); // This will print the list of reviews to the console.
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

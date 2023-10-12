const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userroutes');
const carRoutes = require('./routes/carroute');
const reviewRoutes = require('./routes/reviewroute');



app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));



  app.get('/api/test', (req, res) => {
    console.log("Test endpoint hit!");
    res.json({ message: 'This is a test message from the server' });
  });


app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

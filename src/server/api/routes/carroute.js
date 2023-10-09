const express = require('express');
const router = express.Router();
const upload = require('./multer')
const pool = require('../../db/client');  

const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getCarReviews
} = require('../../db/cars');

// Fetch all cars
router.get('/', async (req, res, next) => {
    try {
        const cars = await getAllCars();
        res.json({ success: true, data: cars });
    } catch (err) {
        next(err);
    }
});

// Fetch a specific car
router.get('/:carId', async (req, res, next) => {
    try {
        const car = await getCarById(req.params.carId);
        if (car) {
            res.json({ success: true, data: car });
        } else {
            res.status(404).json({ success: false, message: "Car not found" });
        }
    } catch (err) {
        next(err);
    }
});

// Add a new car
router.post('/', upload.single('carImage'), async (req, res, next) => {
    try {
        const carData = req.body;
        
        if (req.file) {
            carData.imagePath = req.file.path;  // Add the file path to the carData before saving
        }

        const newCar = await createCar(carData);
        
        res.status(201).json({ success: true, data: newCar });
    } catch (err) {
        next(err);
    }
});



// Update car details
// Update car details
router.put('/:carId', upload.single('carImage'), async (req, res, next) => {
    try {
        const carData = req.body;
        if (req.file) {
            carData.imagePath = req.file.path;  // Add the file path to the carData before updating
        }

        const updatedCar = await updateCar(req.params.carId, carData);
        if (updatedCar) {
            res.json({ success: true, data: updatedCar });
        } else {
            res.status(404).json({ success: false, message: "Car not found" });
        }
    } catch (err) {
        next(err);
    }
});


// Delete a car
router.delete('/:carId', async (req, res, next) => {
    try {
        const result = await deleteCar(req.params.carId);
        if (result) {
            res.json({ success: true, message: "Car deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Car not found" });
        }
    } catch (err) {
        next(err);
    }
});

// Fetch reviews for a car
router.get('/:carId/reviews', async (req, res, next) => {
    try {
        const reviews = await getCarReviews(req.params.carId);
        res.json({ success: true, data: reviews });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

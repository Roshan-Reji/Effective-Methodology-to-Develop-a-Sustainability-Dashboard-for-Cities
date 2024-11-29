const express = require('express');
const router = express.Router();
const CityMetric = require('../models/CityMetric');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await CityMetric.find().select('cityName -_id');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new city - protected route
router.post('/', auth, checkRole(['admin']), async (req, res) => {
  const cityMetric = new CityMetric({
    cityName: req.body.cityName,
    metrics: req.body.metrics
  });

  try {
    const newCity = await cityMetric.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
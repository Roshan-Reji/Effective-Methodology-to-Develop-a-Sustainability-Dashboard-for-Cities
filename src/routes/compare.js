const express = require('express');
const router = express.Router();
const CityMetric = require('../models/CityMetric');

// Compare metrics between cities
router.get('/', async (req, res) => {
  try {
    const { cities } = req.query; // Expect comma-separated list of cities
    const cityList = cities.split(',');
    
    const metrics = await CityMetric.find({
      cityName: { $in: cityList }
    });
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
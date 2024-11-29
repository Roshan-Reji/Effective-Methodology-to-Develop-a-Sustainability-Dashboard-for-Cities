const express = require('express');
const router = express.Router();
const CityMetric = require('../models/CityMetric');
const auth = require('../middleware/auth');

// Get metrics for a specific city
router.get('/:cityName', auth, async (req, res) => {
  try {
    const metrics = await CityMetric.findOne({ 
      cityName: req.params.cityName 
    });

    if (!metrics) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Transform data if needed
    const transformedData = {
      cityName: metrics.cityName,
      metrics: {
        // Map your data to the expected format
        field1: metrics.metrics.yourExistingField1,
        field2: metrics.metrics.yourExistingField2,
        // ... other fields
      },
      lastUpdated: metrics.lastUpdated
    };

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
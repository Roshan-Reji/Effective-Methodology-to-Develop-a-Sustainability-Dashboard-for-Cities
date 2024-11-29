const mongoose = require('mongoose');

const cityMetricSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    index: true
  },
  metrics: {
    yourExistingField1: {
      type: String,
      required: true
    },
    yourExistingField2: {
      type: Number
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CityMetric', cityMetricSchema); 
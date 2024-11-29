const cron = require('node-cron');
const ExternalApiService = require('./externalApi');
const CityMetric = require('../models/CityMetric');

// Update metrics every 6 hours
cron.schedule('0 */6 * * *', async () => {
  try {
    const cities = await CityMetric.find().select('cityName');
    
    for (const city of cities) {
      await ExternalApiService.updateCityMetrics(city.cityName);
    }
    
    console.log('Successfully updated city metrics');
  } catch (error) {
    console.error('Error updating city metrics:', error);
  }
}); 
const axios = require('axios');
const CityMetric = require('../models/CityMetric');

class ExternalApiService {
  static async fetchExternalData(city) {
    try {
      // Your API call
      const response = await axios.get(
        `${process.env.YOUR_API_URL}/endpoint`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.YOUR_API_KEY}`,
            // Add any other required headers
          },
          params: {
            city: city,
            // Add any other required parameters
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
      return null;
    }
  }

  static async updateCityMetrics(cityName) {
    try {
      const apiData = await this.fetchExternalData(cityName);
      
      // Process and store the data
      await CityMetric.findOneAndUpdate(
        { cityName },
        {
          $set: {
            'metrics.yourMetric': apiData,
            lastUpdated: new Date()
          }
        },
        { upsert: true }
      );

      return true;
    } catch (error) {
      console.error(`Error updating metrics for ${cityName}:`, error);
      return false;
    }
  }
}

module.exports = ExternalApiService; 
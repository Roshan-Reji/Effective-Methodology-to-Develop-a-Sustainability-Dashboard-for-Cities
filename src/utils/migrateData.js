const mongoose = require('mongoose');
require('dotenv').config();
const CityMetric = require('../models/CityMetric');

async function migrateData() {
  try {
    // Connect to your existing database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Get all documents from your existing collection
    const existingData = await mongoose.connection.db
      .collection('your_existing_collection')
      .find({})
      .toArray();

    // Transform and insert data
    for (const data of existingData) {
      await CityMetric.findOneAndUpdate(
        { cityName: data.cityName }, // or whatever unique identifier you use
        {
          $set: {
            metrics: {
              // Map your existing data to the new schema
              yourExistingField1: data.field1,
              yourExistingField2: data.field2,
              // ... map other fields
            },
            lastUpdated: data.timestamp || new Date()
          }
        },
        { upsert: true, new: true }
      );
    }

    console.log('Data migration completed successfully');
  } catch (error) {
    console.error('Error migrating data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the migration
migrateData(); 
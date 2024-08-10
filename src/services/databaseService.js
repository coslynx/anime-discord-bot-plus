const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/database.config');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = {
  connectToDatabase,
};
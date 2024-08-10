const { Schema } = require('mongoose');

const customCommandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  response: { type: String, required: true },
});

module.exports = customCommandSchema;
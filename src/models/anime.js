const { Schema } = require('mongoose');

const animeSchema = new Schema({
  malId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  synopsis: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  episodes: { type: Number, required: true },
  rating: { type: Number, required: true },
  genres: [{ type: String, required: true }],
  airingStatus: { type: String, required: true },
  source: { type: String, required: true },
  studios: [{ type: String, required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  popularity: { type: Number, required: true },
  favorites: { type: Number, required: true },
  trailerUrl: { type: String, required: false },
  streamingServices: [{ type: String, required: false }],
});

module.exports = animeSchema;
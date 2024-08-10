const { Schema } = require('mongoose');

const userSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  watchlist: [{ title: { type: String, required: true } }],
  preferredService: { type: String, default: 'crunchyroll' },
  playbackSpeed: { type: Number, default: 1.0 },
  autoplay: { type: Boolean, default: false },
  volume: { type: Number, default: 50 },
  customCommands: [{ name: { type: String, required: true }, response: { type: String, required: true } }],
  animeChannels: [{ type: Schema.Types.ObjectId, ref: 'AnimeChannel' }],
});

module.exports = userSchema;
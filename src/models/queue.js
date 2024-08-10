const { Schema } = require('mongoose');

const queueSchema = new Schema({
  guildId: { type: String, required: true },
  textChannelId: { type: String, required: true },
  voiceChannelId: { type: String, required: true },
  connection: { type: Object, required: false },
  queue: [{
    title: { type: String, required: true },
    episodeNumber: { type: Number, required: false },
    source: { type: String, required: false },
    requestedBy: { type: String, required: true },
    animeData: { type: Object, required: false },
  }],
  playing: { type: Boolean, default: false },
  current: { type: Object, required: false },
  volume: { type: Number, default: 50 },
  loop: { type: String, default: 'off' },
  history: [{
    title: { type: String, required: true },
    episodeNumber: { type: Number, required: false },
    timestamp: { type: Date, required: true },
  }],
});

module.exports = queueSchema;
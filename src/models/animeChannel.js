const { Schema } = require('mongoose');

const animeChannelSchema = new Schema({
  guildId: { type: String, required: true },
  anime: { type: String, required: true },
  channel: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = animeChannelSchema;
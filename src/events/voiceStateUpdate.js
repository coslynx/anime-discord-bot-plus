const { Client, VoiceState } = require('discord.js');
const { getQueue, addAnimeToQueue, playAnime, skipQueue, clearQueue } = require('../../services/queueService');

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    const { guild, channel } = newState;
    const { member } = newState;

    if (!guild || !channel || !member) return;

    const queue = await getQueue(guild.id);

    // Check if the bot is in a voice channel and if the user is joining the bot's channel
    if (queue && queue.connection && channel.id === queue.connection.channel.id) {
      if (oldState.channel === null) {
        // User joined the bot's channel
        if (!queue.playing) {
          await playAnime(guild.id);
        }
      } else if (newState.channel === null) {
        // User left the bot's channel
        // If the bot is idle and no one is in the voice channel, disconnect the bot
        if (queue.connection.channel.members.size === 1) {
          await clearQueue(guild.id);
          await queue.connection.disconnect();
        }
      }
    }
  },
};
const { SlashCommandBuilder } = require('discord.js');
const { getQueue, clearQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop playing the current anime.'),
  async execute(interaction) {
    try {
      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no anime currently playing.');
        return;
      }

      await clearQueue(interaction.guildId);
      await interaction.reply('Anime playback stopped!');
    } catch (error) {
      console.error('Error stopping anime playback:', error);
      await interaction.reply('An error occurred while stopping anime playback.');
    }
  },
};
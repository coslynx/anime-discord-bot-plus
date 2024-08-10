const { SlashCommandBuilder } = require('discord.js');
const { clearQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearqueue')
    .setDescription('Clear the current anime queue.'),
  async execute(interaction) {
    try {
      await clearQueue(interaction.guildId);
      await interaction.reply('Anime queue cleared!');
    } catch (error) {
      console.error('Error clearing queue:', error);
      await interaction.reply('An error occurred while clearing the queue.');
    }
  },
};
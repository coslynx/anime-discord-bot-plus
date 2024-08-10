const { SlashCommandBuilder } = require('discord.js');
const { shuffleQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current anime queue.'),
  async execute(interaction) {
    try {
      await shuffleQueue(interaction.guildId);
      await interaction.reply('Anime queue shuffled!');
    } catch (error) {
      console.error('Error shuffling queue:', error);
      await interaction.reply('An error occurred while shuffling the queue.');
    }
  },
};
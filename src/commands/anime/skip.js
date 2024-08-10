const { SlashCommandBuilder } = require('discord.js');
const { getQueue, skipQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current anime episode.'),
  async execute(interaction) {
    try {
      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no anime currently playing.');
        return;
      }

      await skipQueue(interaction.guildId);
      await interaction.reply('Skipping to the next anime episode!');
    } catch (error) {
      console.error('Error skipping anime episode:', error);
      await interaction.reply('An error occurred while skipping the anime episode.');
    }
  },
};
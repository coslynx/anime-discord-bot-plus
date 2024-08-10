const { SlashCommandBuilder } = require('discord.js');
const { getQueue, toggleLoop } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Toggle looping the current song or the entire queue.')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Choose loop type')
        .setRequired(true)
        .addChoices(
          { name: 'song', value: 'song' },
          { name: 'queue', value: 'queue' },
        ),
    ),
  async execute(interaction) {
    try {
      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no song currently playing.');
        return;
      }

      const loopType = interaction.options.getString('type');

      await toggleLoop(interaction.guildId, loopType);

      const loopMessage = loopType === 'song'
        ? 'Looping the current song!'
        : 'Looping the entire queue!';

      await interaction.reply(loopMessage);
    } catch (error) {
      console.error('Error toggling loop:', error);
      await interaction.reply('An error occurred while toggling the loop.');
    }
  },
};
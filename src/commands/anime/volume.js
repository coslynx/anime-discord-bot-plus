const { SlashCommandBuilder } = require('discord.js');
const { getQueue, setVolume } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the volume of the music player.')
    .addNumberOption(option =>
      option.setName('volume')
        .setDescription('Volume level (0-100)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100),
    ),
  async execute(interaction) {
    try {
      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no song currently playing.');
        return;
      }

      const volume = interaction.options.getNumber('volume');

      await setVolume(interaction.guildId, volume);
      await interaction.reply(`Volume set to ${volume}%`);
    } catch (error) {
      console.error('Error setting volume:', error);
      await interaction.reply('An error occurred while setting the volume.');
    }
  },
};
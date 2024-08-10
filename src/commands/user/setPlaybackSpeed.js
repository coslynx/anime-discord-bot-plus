const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setplaybackspeed')
    .setDescription('Set your preferred playback speed for anime episodes.')
    .addNumberOption(option =>
      option.setName('speed')
        .setDescription('Playback speed (e.g., 1.0 for normal speed, 1.5 for faster)')
        .setRequired(true)
        .setMinValue(0.5)
        .setMaxValue(2.0),
    ),
  async execute(interaction) {
    try {
      const playbackSpeed = interaction.options.getNumber('speed');

      const user = await getUser(interaction.user.id);

      if (!user) {
        await interaction.reply('You are not registered with the bot yet. Use `/addanime` to add an anime to your watchlist.');
        return;
      }

      // Update the user's playback speed setting
      await updateUser(interaction.user.id, { playbackSpeed });

      await interaction.reply(`Your playback speed has been set to ${playbackSpeed}x.`);
    } catch (error) {
      console.error('Error setting playback speed:', error);
      await interaction.reply('An error occurred while setting your playback speed.');
    }
  },
};
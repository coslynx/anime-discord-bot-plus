const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Toggle autoplay for anime episodes.')
    .addBooleanOption(option =>
      option.setName('enable')
        .setDescription('Enable or disable autoplay.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const enableAutoplay = interaction.options.getBoolean('enable');

      const user = await getUser(interaction.user.id);

      if (!user) {
        await interaction.reply('You are not registered with the bot yet. Use `/addanime` to add an anime to your watchlist.');
        return;
      }

      // Update the user's autoplay setting
      await updateUser(interaction.user.id, { autoplay: enableAutoplay });

      const message = enableAutoplay
        ? 'Autoplay enabled. The next episode will start automatically.'
        : 'Autoplay disabled. You will need to manually start each episode.';

      await interaction.reply(message);
    } catch (error) {
      console.error('Error toggling autoplay:', error);
      await interaction.reply('An error occurred while toggling autoplay.');
    }
  },
};
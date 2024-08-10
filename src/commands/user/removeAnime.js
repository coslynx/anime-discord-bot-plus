const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeanime')
    .setDescription('Remove an anime from your watchlist.')
    .addStringOption(option =>
      option.setName('anime')
        .setDescription('The anime title you want to remove.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const animeTitle = interaction.options.getString('anime');

      const user = await getUser(interaction.user.id);

      if (!user) {
        await interaction.reply('You are not registered with the bot yet. Use `/addanime` to add an anime to your watchlist.');
        return;
      }

      // Find the anime in the user's watchlist
      const animeIndex = user.watchlist.findIndex(anime => anime.title === animeTitle);

      if (animeIndex === -1) {
        await interaction.reply(`You do not have \"${animeTitle}\" in your watchlist.`);
        return;
      }

      // Remove the anime from the watchlist
      user.watchlist.splice(animeIndex, 1);

      // Update the user's data in the database
      await updateUser(interaction.user.id, user);

      await interaction.reply(`Removed \"${animeTitle}\" from your watchlist.`);
    } catch (error) {
      console.error('Error removing anime from watchlist:', error);
      await interaction.reply('An error occurred while removing the anime from your watchlist.');
    }
  },
};
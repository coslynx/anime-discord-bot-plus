const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addanime')
    .setDescription('Add an anime to your watchlist.')
    .addStringOption(option =>
      option.setName('anime')
        .setDescription('The anime title you want to add.')
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

      // Check if the anime is already in the user's watchlist
      const animeIndex = user.watchlist.findIndex(anime => anime.title === animeTitle);

      if (animeIndex !== -1) {
        await interaction.reply(`You already have \\\"${animeTitle}\\\" in your watchlist.`);
        return;
      }

      // Add the anime to the watchlist
      user.watchlist.push({ title: animeTitle });

      // Update the user's data in the database
      await updateUser(interaction.user.id, user);

      await interaction.reply(`Added \\\"${animeTitle}\\\" to your watchlist!`);
    } catch (error) {
      console.error('Error adding anime to watchlist:', error);
      await interaction.reply('An error occurred while adding the anime to your watchlist.');
    }
  },
};
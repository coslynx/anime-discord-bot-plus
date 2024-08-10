const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listanime')
    .setDescription('List your anime watchlist.'),
  async execute(interaction) {
    try {
      const user = await getUser(interaction.user.id);

      if (!user) {
        await interaction.reply('You are not registered with the bot yet. Use `/addanime` to add an anime to your watchlist.');
        return;
      }

      if (user.watchlist.length === 0) {
        await interaction.reply('Your watchlist is currently empty.');
        return;
      }

      const watchlistString = user.watchlist.map((anime, index) => `${index + 1}. ${anime.title}`).join('\n');

      await interaction.reply(`Your Anime Watchlist:\n${watchlistString}`);
    } catch (error) {
      console.error('Error listing anime watchlist:', error);
      await interaction.reply('An error occurred while listing your watchlist.');
    }
  },
};
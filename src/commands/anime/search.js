const { SlashCommandBuilder } = require('discord.js');
const { searchAnime } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search for an anime.')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The anime title or keywords to search for.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const query = interaction.options.getString('query');
      const searchResults = await searchAnime(query);

      if (searchResults.length === 0) {
        await interaction.reply('No anime found matching your query.');
        return;
      }

      const searchResultList = searchResults.map((anime, index) => `${index + 1}. ${anime.title}`).join('\n');

      await interaction.reply(`Search results for "${query}":\n${searchResultList}`);
    } catch (error) {
      console.error('Error searching for anime:', error);
      await interaction.reply('An error occurred while searching for the anime.');
    }
  },
};
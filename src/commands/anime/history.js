const { SlashCommandBuilder } = require('discord.js');
const { getAnimeHistory } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('View recent anime playback history.'),
  async execute(interaction) {
    try {
      const history = await getAnimeHistory(interaction.guildId);

      if (history.length === 0) {
        await interaction.reply('No anime playback history found for this server.');
        return;
      }

      const historyList = history.map((anime, index) => `${index + 1}. ${anime.title} - Episode ${anime.episodeNumber} (${anime.timestamp})`).join('\n');

      await interaction.reply(`Recent Anime Playback History:\n${historyList}`);
    } catch (error) {
      console.error('Error fetching anime history:', error);
      await interaction.reply('An error occurred while fetching anime history.');
    }
  },
};
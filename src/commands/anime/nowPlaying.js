const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show information about the currently playing anime.'),
  async execute(interaction) {
    try {
      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no anime currently playing.');
        return;
      }

      const currentAnime = queue.current;
      const embed = {
        color: 0x0099ff,
        title: currentAnime.title,
        fields: [
          { name: 'Episode', value: currentAnime.episodeNumber, inline: true },
          { name: 'Source', value: currentAnime.source, inline: true },
          { name: 'Requested by', value: currentAnime.requestedBy, inline: true },
        ],
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching now playing information:', error);
      await interaction.reply('An error occurred while fetching the now playing information.');
    }
  },
};
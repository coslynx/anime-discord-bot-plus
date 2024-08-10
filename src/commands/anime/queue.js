const { SlashCommandBuilder } = require('discord.js');
const { getQueue, addAnimeToQueue } = require('../../services/queueService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Add an anime to the queue.')
    .addStringOption(option =>
      option.setName('anime')
        .setDescription('The anime title you want to add.')
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option.setName('episode')
        .setDescription('The episode number you want to add.')
        .setRequired(false),
    )
    .addStringOption(option =>
      option.setName('source')
        .setDescription('The streaming service where the anime is available.')
        .setRequired(false)
        .addChoices(
          { name: 'Crunchyroll', value: 'crunchyroll' },
          { name: 'Funimation', value: 'funimation' },
          { name: 'Netflix', value: 'netflix' },
        ),
    ),
  async execute(interaction) {
    try {
      const animeTitle = interaction.options.getString('anime');
      const episodeNumber = interaction.options.getInteger('episode');
      const source = interaction.options.getString('source');

      const queue = await getQueue(interaction.guildId);

      if (!queue) {
        await interaction.reply('There is no queue active in this server.');
        return;
      }

      await addAnimeToQueue(interaction.guildId, animeTitle, episodeNumber, source, interaction.user.username);
      await interaction.reply(`Added "${animeTitle}" to the queue!`);
    } catch (error) {
      console.error('Error adding anime to queue:', error);
      await interaction.reply('An error occurred while adding the anime to the queue.');
    }
  },
};
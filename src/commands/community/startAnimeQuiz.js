const { SlashCommandBuilder } = require('discord.js');
const { startAnimeQuiz } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('startquiz')
    .setDescription('Start an anime quiz.')
    .addIntegerOption(option =>
      option.setName('difficulty')
        .setDescription('Choose a difficulty level (1-3).')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(3),
    )
    .addIntegerOption(option =>
      option.setName('rounds')
        .setDescription('Set the number of rounds.')
        .setRequired(true)
        .setMinValue(1),
    ),
  async execute(interaction) {
    try {
      const difficulty = interaction.options.getInteger('difficulty');
      const rounds = interaction.options.getInteger('rounds');

      await startAnimeQuiz(interaction, difficulty, rounds);
    } catch (error) {
      console.error('Error starting anime quiz:', error);
      await interaction.reply('An error occurred while starting the anime quiz.');
    }
  },
};
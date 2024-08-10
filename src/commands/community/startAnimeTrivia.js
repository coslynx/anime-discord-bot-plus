const { SlashCommandBuilder } = require('discord.js');
const { startAnimeTrivia } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('starttrivia')
    .setDescription('Start an anime trivia game.')
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

      await startAnimeTrivia(interaction, difficulty, rounds);
    } catch (error) {
      console.error('Error starting anime trivia:', error);
      await interaction.reply('An error occurred while starting the anime trivia.');
    }
  },
};
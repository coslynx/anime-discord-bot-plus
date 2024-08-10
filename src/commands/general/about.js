const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Information about the anime bot.'),
  async execute(interaction) {
    await interaction.reply('This bot is designed to enhance your anime viewing experience on Discord. It allows you to watch anime with friends, manage queues, discover new shows, and even participate in fun quizzes and trivia!');
  },
};
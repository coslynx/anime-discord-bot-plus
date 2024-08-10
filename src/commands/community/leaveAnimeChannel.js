const { SlashCommandBuilder } = require('discord.js');
const { leaveAnimeChannel } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leavechannel')
    .setDescription('Leave the current anime channel.')
    .addStringOption(option =>
      option.setName('channel')
        .setDescription('The name of the anime channel to leave.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const channelName = interaction.options.getString('channel');

      await leaveAnimeChannel(interaction, channelName);
      await interaction.reply(`You have successfully left the ${channelName} channel.`);
    } catch (error) {
      console.error('Error leaving anime channel:', error);
      await interaction.reply('An error occurred while leaving the anime channel.');
    }
  },
};
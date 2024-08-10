const { SlashCommandBuilder } = require('discord.js');
const { joinAnimeChannel } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joinchannel')
    .setDescription('Join an anime channel.')
    .addStringOption(option =>
      option.setName('channel')
        .setDescription('The name of the anime channel to join.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const channelName = interaction.options.getString('channel');

      await joinAnimeChannel(interaction, channelName);
      await interaction.reply(`You have successfully joined the ${channelName} channel.`);
    } catch (error) {
      console.error('Error joining anime channel:', error);
      await interaction.reply('An error occurred while joining the anime channel.');
    }
  },
};
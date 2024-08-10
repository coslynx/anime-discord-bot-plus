const { SlashCommandBuilder } = require('discord.js');
const { createAnimeChannel } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createanimechannel')
    .setDescription('Create a dedicated channel for a specific anime.')
    .addStringOption(option =>
      option.setName('anime')
        .setDescription('The name of the anime for the channel.')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const animeName = interaction.options.getString('anime');

      await createAnimeChannel(interaction, animeName);
      await interaction.reply(`Channel for ${animeName} created successfully!`);
    } catch (error) {
      console.error('Error creating anime channel:', error);
      await interaction.reply('An error occurred while creating the anime channel.');
    }
  },
};
const { SlashCommandBuilder } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpreferredservice')
    .setDescription('Set your preferred streaming service for anime episodes.')
    .addStringOption(option =>
      option.setName('service')
        .setDescription('The streaming service you prefer.')
        .setRequired(true)
        .addChoices(
          { name: 'Crunchyroll', value: 'crunchyroll' },
          { name: 'Funimation', value: 'funimation' },
          { name: 'Netflix', value: 'netflix' },
        ),
    ),
  async execute(interaction) {
    try {
      const preferredService = interaction.options.getString('service');

      const user = await getUser(interaction.user.id);

      if (!user) {
        await interaction.reply('You are not registered with the bot yet. Use `/addanime` to add an anime to your watchlist.');
        return;
      }

      // Update the user's preferred streaming service
      await updateUser(interaction.user.id, { preferredService });

      await interaction.reply(`Your preferred streaming service has been set to ${preferredService}.`);
    } catch (error) {
      console.error('Error setting preferred streaming service:', error);
      await interaction.reply('An error occurred while setting your preferred streaming service.');
    }
  },
};
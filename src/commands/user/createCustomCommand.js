const { SlashCommandBuilder } = require('discord.js');
const { createCustomCommand, getCustomCommand, deleteCustomCommand } = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcustomcommand')
    .setDescription('Create a custom command for yourself.')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of your custom command.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('response')
        .setDescription('The response that should be sent when the command is used.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const commandName = interaction.options.getString('name');
      const commandResponse = interaction.options.getString('response');

      // Check if a command with the same name already exists
      const existingCommand = await getCustomCommand(interaction.user.id, commandName);
      if (existingCommand) {
        await interaction.reply(`A custom command with the name "${commandName}" already exists.`);
        return;
      }

      // Create the custom command
      await createCustomCommand(interaction.user.id, commandName, commandResponse);
      await interaction.reply(`Custom command "${commandName}" created successfully!`);
    } catch (error) {
      console.error('Error creating custom command:', error);
      await interaction.reply('An error occurred while creating the custom command.');
    }
  },
};
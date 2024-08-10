const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of available commands.'),
  async execute(interaction) {
    const commands = interaction.client.commands.filter(command => command.data.name !== 'help').map(command => `- \`${command.data.name}\`: ${command.data.description}`).join('\n');
    await interaction.reply(`Here are all the available commands:\n${commands}`);
  },
};
const { Collection } = require('discord.js');
const { getCustomCommand, executeCustomCommand } = require('../userService');

module.exports = {
  /
    Handles commands received from Discord.
    @param {import('discord.js').Client} client - The Discord client instance.
    @param {import('discord.js').Message} message - The message containing the command.
   /
  async handleCommand(client, message) {
    try {
      // Check if the message is a command
      if (message.content.startsWith('!')) {
        const commandName = message.content.split(' ')[0].slice(1);
        const args = message.content.split(' ').slice(1);

        // Check if the command is a custom command
        const customCommand = await getCustomCommand(message.author.id, commandName);
        if (customCommand) {
          await executeCustomCommand(message, customCommand, args);
          return;
        }

        // Handle built-in commands (e.g., !help, !about)
        // ...
      } else {
        // Handle regular messages (e.g., check for mentions, reply to specific keywords)
        // ...
      }
    } catch (error) {
      console.error('Error handling command:', error);
      // Handle errors gracefully, e.g., send an error message to the user
    }
  },
};
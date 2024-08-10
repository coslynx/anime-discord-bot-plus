const { Client, Message } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');
const { getCustomCommand, executeCustomCommand } = require('../../services/userService');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
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
      console.error('Error handling messageCreate event:', error);
      // Handle errors gracefully, e.g., send an error message to the user
    }
  },
};
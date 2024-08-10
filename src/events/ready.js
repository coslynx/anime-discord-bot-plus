const { Client } = require('discord.js');
const { connectToDatabase } = require('../../services/databaseService');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      await connectToDatabase();

      console.log(`Ready! Logged in as ${client.user.tag}`);

      // Load all commands from the 'commands' directory
      client.commands = new Collection();
      const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const filePath = path.join('./src/commands', file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
      }

      // Register all slash commands globally
      await client.application.commands.set(client.commands.map(command => command.data));

      // ... Any other initial setup tasks ...
    } catch (error) {
      console.error('Error in ready event:', error);
    }
  },
};
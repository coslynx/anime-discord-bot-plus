const { Client, GuildMember } = require('discord.js');
const { getUser, updateUser } = require('../../services/userService');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const user = await getUser(member.id);

      if (!user) {
        // Create a new user document in the database
        await updateUser(member.id, {
          username: member.user.username,
          discriminator: member.user.discriminator,
          watchlist: [],
          preferredService: 'crunchyroll', // Default streaming service
          playbackSpeed: 1.0, // Default playback speed
          autoplay: false, // Default autoplay setting
          volume: 50, // Default volume
          customCommands: [],
        });
      }

      // Send a welcome message to the new member
      await member.send(`Welcome to the server, ${member.user.username}! We're happy to have you here.`);
    } catch (error) {
      console.error('Error handling guildMemberAdd event:', error);
    }
  },
};
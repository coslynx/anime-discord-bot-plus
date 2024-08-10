const { Client, Interaction } = require('discord.js');
const { getQueue, addAnimeToQueue, playAnime } = require('../../services/queueService');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
      case 'play': {
        try {
          const animeTitle = interaction.options.getString('anime');
          const episodeNumber = interaction.options.getInteger('episode');
          const source = interaction.options.getString('source');

          const queue = await getQueue(interaction.guildId);

          if (!queue) {
            await interaction.reply('There is no queue active in this server. Use `/queue` to start one!');
            return;
          }

          await addAnimeToQueue(interaction.guildId, animeTitle, episodeNumber, source, interaction.user.username);
          await interaction.reply(`Added "${animeTitle}" to the queue!`);

          // If the bot is not already playing, start playback
          if (!queue.playing) {
            await playAnime(interaction.guildId);
          }
        } catch (error) {
          console.error('Error playing anime:', error);
          await interaction.reply('An error occurred while playing the anime.');
        }
        break;
      }
      case 'queue': {
        try {
          const animeTitle = interaction.options.getString('anime');
          const episodeNumber = interaction.options.getInteger('episode');
          const source = interaction.options.getString('source');

          const queue = await getQueue(interaction.guildId);

          if (!queue) {
            await interaction.reply('There is no queue active in this server.');
            return;
          }

          await addAnimeToQueue(interaction.guildId, animeTitle, episodeNumber, source, interaction.user.username);
          await interaction.reply(`Added "${animeTitle}" to the queue!`);
        } catch (error) {
          console.error('Error adding anime to queue:', error);
          await interaction.reply('An error occurred while adding the anime to the queue.');
        }
        break;
      }
      case 'skip': {
        try {
          const queue = await getQueue(interaction.guildId);

          if (!queue) {
            await interaction.reply('There is no anime currently playing.');
            return;
          }

          await skipQueue(interaction.guildId);
          await interaction.reply('Skipping to the next anime episode!');
        } catch (error) {
          console.error('Error skipping anime episode:', error);
          await interaction.reply('An error occurred while skipping the anime episode.');
        }
        break;
      }
      case 'stop': {
        try {
          const queue = await getQueue(interaction.guildId);

          if (!queue) {
            await interaction.reply('There is no anime currently playing.');
            return;
          }

          await clearQueue(interaction.guildId);
          await interaction.reply('Anime playback stopped!');
        } catch (error) {
          console.error('Error stopping anime playback:', error);
          await interaction.reply('An error occurred while stopping anime playback.');
        }
        break;
      }
      case 'volume': {
        try {
          const queue = await getQueue(interaction.guildId);

          if (!queue) {
            await interaction.reply('There is no song currently playing.');
            return;
          }

          const volume = interaction.options.getNumber('volume');

          await setVolume(interaction.guildId, volume);
          await interaction.reply(`Volume set to ${volume}%`);
        } catch (error) {
          console.error('Error setting volume:', error);
          await interaction.reply('An error occurred while setting the volume.');
        }
        break;
      }
      // Add more cases for other commands as needed
      default:
        break;
    }
  },
};
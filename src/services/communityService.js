const { Guild, TextChannel } = require('discord.js');
const { getAnimeChannel } = require('./animeChannelService');
const { createChannel } = require('../channelService');
const { getUser, updateUser } = require('./userService');
const { getAnimeData } = require('./animeService');

/
  Creates a dedicated channel for a specific anime.
 
  @param {Interaction} interaction The Discord interaction object.
  @param {string} animeName The name of the anime for the channel.
  @returns {Promise<void>}
 /
const createAnimeChannel = async (interaction, animeName) => {
  try {
    const guild = interaction.guild;
    const channelName = `${animeName}-channel`;

    // Check if a channel with the same name already exists
    const existingChannel = guild.channels.cache.find(
      (channel) => channel.name === channelName
    );

    if (existingChannel) {
      await interaction.reply(
        `A channel with the name "${channelName}" already exists.`
      );
      return;
    }

    // Fetch anime data
    const animeData = await getAnimeData(animeName);

    if (!animeData) {
      await interaction.reply(`Could not find anime: ${animeName}`);
      return;
    }

    // Create the channel
    const newChannel = await createChannel(
      guild,
      channelName,
      'text',
      `A dedicated channel for discussing ${animeName}`
    );

    // Update the database with anime channel information
    await getAnimeChannel(interaction.guildId, channelName).then((animeChannel) => {
      if (!animeChannel) {
        return getAnimeChannel.create({
          guildId: interaction.guildId,
          anime: animeData.title,
          channel: newChannel.id,
        });
      }
      // Existing channel, update
      animeChannel.channel = newChannel.id;
      animeChannel.save();
    });

    // Update user data for the creator of the channel
    const user = await getUser(interaction.user.id);
    user.animeChannels.push(newChannel.id);
    await updateUser(interaction.user.id, user);

    await interaction.reply(`Channel for ${animeName} created successfully!`);
  } catch (error) {
    console.error('Error creating anime channel:', error);
    await interaction.reply(
      'An error occurred while creating the anime channel.'
    );
  }
};

/
  Allows a user to join an anime channel.
 
  @param {Interaction} interaction The Discord interaction object.
  @param {string} channelName The name of the anime channel to join.
  @returns {Promise<void>}
 /
const joinAnimeChannel = async (interaction, channelName) => {
  try {
    const guild = interaction.guild;
    const channel = guild.channels.cache.find(
      (channel) => channel.name === channelName
    );

    if (!channel) {
      await interaction.reply(
        `A channel with the name "${channelName}" does not exist.`
      );
      return;
    }

    // Update user data
    const user = await getUser(interaction.user.id);
    user.animeChannels.push(channel.id);
    await updateUser(interaction.user.id, user);

    await interaction.reply(
      `You have successfully joined the ${channelName} channel.`
    );
  } catch (error) {
    console.error('Error joining anime channel:', error);
    await interaction.reply('An error occurred while joining the anime channel.');
  }
};

/
  Allows a user to leave an anime channel.
 
  @param {Interaction} interaction The Discord interaction object.
  @param {string} channelName The name of the anime channel to leave.
  @returns {Promise<void>}
 /
const leaveAnimeChannel = async (interaction, channelName) => {
  try {
    const guild = interaction.guild;
    const channel = guild.channels.cache.find(
      (channel) => channel.name === channelName
    );

    if (!channel) {
      await interaction.reply(
        `A channel with the name "${channelName}" does not exist.`
      );
      return;
    }

    // Update user data
    const user = await getUser(interaction.user.id);
    const channelIndex = user.animeChannels.indexOf(channel.id);
    if (channelIndex > -1) {
      user.animeChannels.splice(channelIndex, 1);
      await updateUser(interaction.user.id, user);
    }

    await interaction.reply(
      `You have successfully left the ${channelName} channel.`
    );
  } catch (error) {
    console.error('Error leaving anime channel:', error);
    await interaction.reply('An error occurred while leaving the anime channel.');
  }
};

/
  Starts an anime-related quiz with questions, answers, and scoring.
 
  @param {Interaction} interaction The Discord interaction object.
  @param {number} difficulty The difficulty level (1-3).
  @param {number} rounds The number of rounds in the quiz.
  @returns {Promise<void>}
 /
const startAnimeQuiz = async (interaction, difficulty, rounds) => {
  try {
    // Implementation for starting a quiz
    // - Fetch anime-related quiz questions based on difficulty.
    // - Create a quiz object (potentially with a timer and scoring system).
    // - Send the first question to the channel.
    // - Handle user responses, checking answers and updating scores.
    // - Continue through rounds until all questions are asked.
    // - Announce the winner or display results.

    await interaction.reply(
      'Anime Quiz starting soon! Get ready to test your knowledge!'
    );
  } catch (error) {
    console.error('Error starting anime quiz:', error);
    await interaction.reply(
      'An error occurred while starting the anime quiz.'
    );
  }
};

/
  Starts an anime trivia game with multiple-choice questions and scoring.
 
  @param {Interaction} interaction The Discord interaction object.
  @param {number} difficulty The difficulty level (1-3).
  @param {number} rounds The number of rounds in the trivia.
  @returns {Promise<void>}
 /
const startAnimeTrivia = async (interaction, difficulty, rounds) => {
  try {
    // Implementation for starting a trivia game
    // - Fetch anime-related trivia questions based on difficulty.
    // - Create a trivia game object (with a timer, scoring, and a way to track answers).
    // - Send the first question (with multiple-choice options) to the channel.
    // - Handle user responses, checking if they are correct and updating scores.
    // - Continue through rounds until all questions are asked.
    // - Announce the winner or display results.

    await interaction.reply(
      'Anime Trivia starting soon! Get ready to test your knowledge!'
    );
  } catch (error) {
    console.error('Error starting anime trivia:', error);
    await interaction.reply(
      'An error occurred while starting the anime trivia.'
    );
  }
};

module.exports = {
  createAnimeChannel,
  joinAnimeChannel,
  leaveAnimeChannel,
  startAnimeQuiz,
  startAnimeTrivia,
};
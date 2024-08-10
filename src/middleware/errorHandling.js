const { EMBED_COLORS, LOG_LEVELS } = require('./constants');
const logger = require('./logger');

const handleError = (error, interaction, message) => {
  logger.error(error, {
    level: LOG_LEVELS.ERROR,
    context: 'errorHandler',
  });

  if (interaction) {
    interaction.reply({
      content: 'An error occurred. Please try again later.',
      ephemeral: true,
      embeds: [
        {
          color: EMBED_COLORS.ERROR,
          title: 'Error',
          description: error.message,
        },
      ],
    });
  } else if (message) {
    message.reply({
      content: 'An error occurred. Please try again later.',
      embeds: [
        {
          color: EMBED_COLORS.ERROR,
          title: 'Error',
          description: error.message,
        },
      ],
    });
  }
};

module.exports = {
  handleError,
};
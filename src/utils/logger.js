const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const { LOG_LEVELS, EMBED_COLORS } = require('./constants');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    label({ label: 'AnimeDiscordBot' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console({
      format: combine(
        format.colorize(),
        format.simple(),
      ),
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

// Custom logging methods for different log levels
logger.debug = (message, meta) => logger.log({ level: LOG_LEVELS.DEBUG, message, ...meta });
logger.info = (message, meta) => logger.log({ level: LOG_LEVELS.INFO, message, ...meta });
logger.warn = (message, meta) => logger.log({ level: LOG_LEVELS.WARN, message, ...meta });
logger.error = (message, meta) => logger.log({ level: LOG_LEVELS.ERROR, message, ...meta });

module.exports = logger;
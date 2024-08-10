const { format } = require('winston');
const { combine, timestamp, label, printf } = format;
const { LOG_LEVELS, EMBED_COLORS } = require('./constants');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = (req, res, next) => {
  const { method, url, query, body } = req;

  const logMessage = `Request: ${method} ${url}`;
  const logMetadata = {
    query,
    body,
  };

  switch (method) {
    case 'POST':
      logMetadata.body = JSON.stringify(body);
      break;
    case 'PUT':
      logMetadata.body = JSON.stringify(body);
      break;
    case 'DELETE':
      logMetadata.body = JSON.stringify(body);
      break;
    default:
      break;
  }

  console.log(logMessage, logMetadata);
  next();
};
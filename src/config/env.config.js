require('dotenv').config();

module.exports = {
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  MONGO_URI: process.env.MONGODB_URI,
  CRUNCHYROLL_API_KEY: process.env.CRUNCHYROLL_API_KEY,
  FUNIMATION_API_KEY: process.env.FUNIMATION_API_KEY,
  NETFLIX_API_KEY: process.env.NETFLIX_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
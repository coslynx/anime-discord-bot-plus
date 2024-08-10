<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>anime-discord-bot-plus
</h1>
<h4 align="center">A Discord Bot for Enhanced Anime Viewing and Community Engagement</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Discord.js-blue" alt="Discord.js Framework" />
  <img src="https://img.shields.io/badge/Language-JavaScript-red" alt="JavaScript Language" />
  <img src="https://img.shields.io/badge/Database-MongoDB-blue" alt="MongoDB Database" />
  <img src="https://img.shields.io/badge/LLMs-OpenAI-black" alt="OpenAI LLMs" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/anime-discord-bot-plus?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/anime-discord-bot-plus?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/anime-discord-bot-plus?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview

The `anime-discord-bot-plus` repository houses a Discord bot designed to enhance the anime viewing experience within the Discord platform.  This bot aims to create a fun, interactive, and engaging environment for anime fans, fostering a sense of community and shared enjoyment. 

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🎬 | Anime Playback   | The bot seamlessly integrates with popular streaming services like Crunchyroll, Funimation, and Netflix, enabling users to play anime episodes directly within Discord. |
| 💬 | Interactive Features | The bot provides interactive elements like voting on the next anime to play, queuing requests, and displaying real-time information about the currently playing episode. |
| 🎨 | Customization     | Users can personalize their experience by choosing preferred streaming services, adjusting playback settings like volume and speed, and even creating custom commands. |
| 🤝 | Community Features  | The bot encourages community interaction with dedicated channels for anime discussions, facilitating shared experiences and fostering a sense of belonging. |
| 🚀 | Scalability      | The bot's architecture is designed for scalability, allowing it to handle a growing number of users and concurrent activity. |
| 🔐 | Security       |  Robust security measures are implemented, including data sanitization, input validation, and secure communication protocols. |
| 💡 | AI-Powered Recommendations | The bot leverages OpenAI LLMs for personalized anime recommendations based on user viewing history and preferences. |

## 📂 Structure

```
anime-discord-bot-plus/
├── src
│   ├── commands
│   │   ├── anime
│   │   │   ├── search.js
│   │   │   ├── play.js
│   │   │   ├── queue.js
│   │   │   ├── nowPlaying.js
│   │   │   ├── skip.js
│   │   │   ├── stop.js
│   │   │   ├── volume.js
│   │   │   ├── loop.js
│   │   │   ├── shuffle.js
│   │   │   ├── clearQueue.js
│   │   │   └── history.js
│   │   ├── user
│   │   │   ├── addAnime.js
│   │   │   ├── removeAnime.js
│   │   │   ├── listAnime.js
│   │   │   ├── setPreferredService.js
│   │   │   ├── setPlaybackSpeed.js
│   │   │   ├── setAutoplay.js
│   │   │   ├── setVolume.js
│   │   │   └── createCustomCommand.js
│   │   ├── community
│   │   │   ├── createAnimeChannel.js
│   │   │   ├── joinAnimeChannel.js
│   │   │   ├── leaveAnimeChannel.js
│   │   │   ├── startAnimeQuiz.js
│   │   │   └── startAnimeTrivia.js
│   │   └── general
│   │       ├── help.js
│   │       └── about.js
│   ├── events
│   │   ├── ready.js
│   │   ├── messageCreate.js
│   │   ├── guildMemberAdd.js
│   │   ├── voiceStateUpdate.js
│   │   └── interactionCreate.js
│   ├── services
│   │   ├── animeService.js
│   │   ├── userService.js
│   │   ├── communityService.js
│   │   ├── queueService.js
│   │   ├── playbackService.js
│   │   ├── commandService.js
│   │   └── databaseService.js
│   ├── models
│   │   ├── anime.js
│   │   ├── user.js
│   │   ├── animeChannel.js
│   │   ├── queue.js
│   │   └── customCommand.js
│   ├── utils
│   │   ├── commandHandler.js
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   ├── helper.js
│   │   └── constants.js
│   ├── config
│   │   ├── env.config.js
│   │   └── database.config.js
│   ├── routes
│   │   ├── api.js
│   │   └── musicRoutes.js
│   ├── middleware
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   ├── logging.js
│   │   └── errorHandling.js
│   └── public
│       ├── index.html
│       └── assets
│           ├── styles.css
│           └── logo.png
├── .env
└── package.json
```

## 💻 Installation

### 🔧 Prerequisites
- Node.js
- npm

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/anime-discord-bot-plus.git`
2. Navigate to the project directory:
   - `cd anime-discord-bot-plus`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage

### 🏃‍♂️ Running the Project
1. Start the development server:
   - `npm start`
2. Open your browser and navigate to `http://localhost:3000`.

### ⚙️ Configuration
Adjust configuration settings in `config.js` or `.env`.

### 📚 Examples

- 📝 Example 1: Using the `search` command to find an anime title.
- 📝 Example 2: Adding an anime episode to the queue using the `queue` command.
- 📝 Example 3: Starting an anime trivia game using the `startAnimeTrivia` command.

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Heroku or any host, choose the one best for the project
1. Install the Heroku CLI:
   - `npm install -g heroku`
2. Login to Heroku:
   - `heroku login`
3. Create a new Heroku app:
   - `heroku create`
4. Deploy the code:
   - `git push heroku main`

### 🔑 Environment Variables

- `DISCORD_BOT_TOKEN`: Your Discord bot token
- `MONGODB_URI`: Your MongoDB connection string
- `CRUNCHYROLL_API_KEY`: Your Crunchyroll API key
- `FUNIMATION_API_KEY`: Your Funimation API key
- `NETFLIX_API_KEY`: Your Netflix API key (optional)
- `OPENAI_API_KEY`: Your OpenAI API key

## 📜 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 👥 Authors

- Author Name - [Spectra.codes](https://spectra.codes)
- Creator Name - [DRIX10](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
<p>
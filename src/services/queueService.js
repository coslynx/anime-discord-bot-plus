const { Collection } = require('discord.js');
const { getQueue, updateQueue, clearQueue, setVolume, skipQueue, toggleLoop, shuffleQueue } = require('./queueService');
const { getUser, updateUser } = require('./userService');
const { getAnimeData, getAnimeEpisode } = require('./animeService');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { getStreamingService } = require('../utils/helper');

const queues = new Collection();

module.exports = {
  /
    Retrieves the queue for the specified guild.
    @param {string} guildId The ID of the Discord guild.
    @returns {Promise<Queue>} The queue for the guild, or null if it doesn't exist.
   /
  async getQueue(guildId) {
    const queue = queues.get(guildId);
    return queue;
  },

  /
    Adds an anime to the queue.
    @param {string} guildId The ID of the Discord guild.
    @param {string} animeTitle The title of the anime.
    @param {number} episodeNumber The episode number.
    @param {string} source The streaming service (e.g., 'crunchyroll').
    @param {string} requestedBy The username of the user who requested the anime.
    @returns {Promise<void>}
   /
  async addAnimeToQueue(guildId, animeTitle, episodeNumber, source, requestedBy) {
    const queue = await this.getQueue(guildId) || {
      guild: null,
      textChannelId: null,
      voiceChannelId: null,
      connection: null,
      queue: [],
      playing: false,
      current: null,
      volume: 50,
      loop: 'off',
    };

    if (!queue.guild) {
      queue.guild = await this.getGuild(guildId);
      queue.textChannelId = queue.guild.channels.cache.get(queue.textChannelId) ? queue.textChannelId : null;
      queue.voiceChannelId = queue.guild.channels.cache.get(queue.voiceChannelId) ? queue.voiceChannelId : null;
    }

    queue.queue.push({
      title: animeTitle,
      episodeNumber,
      source,
      requestedBy,
      animeData: null,
    });

    await updateQueue(guildId, queue);
  },

  /
    Starts playback of the next anime in the queue.
    @param {string} guildId The ID of the Discord guild.
    @returns {Promise<void>}
   /
  async playAnime(guildId) {
    const queue = await this.getQueue(guildId);

    if (!queue || queue.playing) {
      return;
    }

    if (queue.connection && !queue.connection.channel) {
      await queue.connection.disconnect();
      return;
    }

    if (!queue.connection) {
      const voiceChannel = queue.guild.channels.cache.get(queue.voiceChannelId);

      if (!voiceChannel) {
        await updateQueue(guildId, { voiceChannelId: null, connection: null, current: null, playing: false });
        return;
      }

      queue.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
    }

    const player = createAudioPlayer();
    queue.player = player;

    queue.connection.subscribe(player);

    const currentAnime = queue.queue[0];

    if (!currentAnime) {
      await updateQueue(guildId, { playing: false });
      return;
    }

    const streamingService = getStreamingService(currentAnime.source);

    // Check if we need to fetch anime data
    if (!currentAnime.animeData) {
      const animeData = await getAnimeData(currentAnime.title, streamingService);

      if (!animeData) {
        await updateQueue(guildId, { queue: queue.queue.slice(1), playing: false });
        queue.guild.channels.cache.get(queue.textChannelId).send(`Could not find anime: ${currentAnime.title}`);
        return;
      }

      currentAnime.animeData = animeData;
      await updateQueue(guildId, { queue });
    }

    const episodeUrl = await getAnimeEpisode(
      currentAnime.animeData.id,
      currentAnime.episodeNumber,
      streamingService,
    );

    if (!episodeUrl) {
      await updateQueue(guildId, { queue: queue.queue.slice(1), playing: false });
      queue.guild.channels.cache.get(queue.textChannelId).send(`Could not find episode ${currentAnime.episodeNumber} of ${currentAnime.title}`);
      return;
    }

    const stream = ytdl(episodeUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Opus });

    player.play(resource);
    queue.playing = true;

    await updateQueue(guildId, { playing: true, current: currentAnime });

    player.on('finish', async () => {
      await updateQueue(guildId, { queue: queue.queue.slice(1), current: null });
      if (queue.loop === 'queue' || queue.loop === 'song') {
        await this.playAnime(guildId);
      } else {
        queue.guild.channels.cache.get(queue.textChannelId).send(`Finished playing ${currentAnime.title} - Episode ${currentAnime.episodeNumber}.`);
        await updateQueue(guildId, { playing: false });
      }
    });

    player.on('error', (error) => {
      console.error('Playback Error:', error);
      queue.guild.channels.cache.get(queue.textChannelId).send('An error occurred while playing the anime.');
      this.playAnime(guildId);
    });
  },

  /
    Clears the anime queue.
    @param {string} guildId The ID of the Discord guild.
    @returns {Promise<void>}
   /
  async clearQueue(guildId) {
    const queue = await this.getQueue(guildId);

    if (!queue) {
      return;
    }

    queue.queue = [];
    queue.playing = false;
    queue.current = null;

    if (queue.connection && queue.connection.channel) {
      await queue.connection.disconnect();
    }

    await updateQueue(guildId, queue);
  },

  /
    Sets the playback volume.
    @param {string} guildId The ID of the Discord guild.
    @param {number} volume The desired volume level (0-100).
    @returns {Promise<void>}
   /
  async setVolume(guildId, volume) {
    const queue = await this.getQueue(guildId);

    if (!queue) {
      return;
    }

    queue.player.volume.setVolume(volume / 100);
    await updateQueue(guildId, { volume });

    queue.guild.channels.cache.get(queue.textChannelId).send(`Volume set to ${volume}%`);
  },

  /
    Skips the current anime episode.
    @param {string} guildId The ID of the Discord guild.
    @returns {Promise<void>}
   /
  async skipQueue(guildId) {
    const queue = await this.getQueue(guildId);

    if (!queue || !queue.playing) {
      return;
    }

    queue.player.stop();
  },

  /
    Toggles the loop mode for the queue.
    @param {string} guildId The ID of the Discord guild.
    @param {string} loopType The type of loop ('song' or 'queue').
    @returns {Promise<void>}
   /
  async toggleLoop(guildId, loopType) {
    const queue = await this.getQueue(guildId);

    if (!queue) {
      return;
    }

    if (queue.loop === loopType) {
      queue.loop = 'off';
    } else {
      queue.loop = loopType;
    }

    await updateQueue(guildId, queue);
  },

  /
    Shuffles the queue.
    @param {string} guildId The ID of the Discord guild.
    @returns {Promise<void>}
   /
  async shuffleQueue(guildId) {
    const queue = await this.getQueue(guildId);

    if (!queue) {
      return;
    }

    const shuffledQueue = shuffle(queue.queue);
    await updateQueue(guildId, { queue: shuffledQueue });
  },
};

// Helper function for shuffling an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()  (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
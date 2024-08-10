const { getQueue, updateQueue, setVolume } = require('./queueService');
const { getUser, updateUser } = require('./userService');
const { getAnimeData, getAnimeEpisode } = require('./animeService');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { getStreamingService } = require('../utils/helper');

module.exports = {
  /
    Handles playback of an anime episode in a Discord voice channel.
    @param {string} guildId - The ID of the Discord guild.
    @returns {Promise<void>}
   /
  async playAnime(guildId) {
    try {
      const queue = await getQueue(guildId);

      if (!queue) {
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
    } catch (error) {
      console.error('Playback Error:', error);
      queue.guild.channels.cache.get(queue.textChannelId).send('An error occurred while playing the anime.');
    }
  },

  /
    Sets the playback volume for the current anime.
    @param {string} guildId - The ID of the Discord guild.
    @param {number} volume - The desired volume level (0-100).
    @returns {Promise<void>}
   /
  async setVolume(guildId, volume) {
    try {
      const queue = await getQueue(guildId);
      if (!queue) {
        return;
      }

      queue.player.volume.setVolume(volume / 100);
      await updateQueue(guildId, { volume });

      queue.guild.channels.cache.get(queue.textChannelId).send(`Volume set to ${volume}%`);
    } catch (error) {
      console.error('Error setting volume:', error);
      queue.guild.channels.cache.get(queue.textChannelId).send('An error occurred while setting the volume.');
    }
  },
};
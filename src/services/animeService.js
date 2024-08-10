const axios = require('axios');
const { CRUNCHYROLL_API_KEY, FUNIMATION_API_KEY, NETFLIX_API_KEY } = require('../config/env.config');
const { getStreamingService } = require('../utils/helper');

const crunchyrollApi = axios.create({
  baseURL: 'https://api.crunchyroll.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CRUNCHYROLL_API_KEY}`,
  },
});

const funimationApi = axios.create({
  baseURL: 'https://api.funimation.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${FUNIMATION_API_KEY}`,
  },
});

const netflixApi = axios.create({
  baseURL: 'https://api.netflix.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NETFLIX_API_KEY}`,
  },
});

async function searchAnime(query) {
  try {
    const streamingService = getStreamingService('crunchyroll');

    const response = await crunchyrollApi.get('/search', {
      params: {
        q: query,
        media_type: 'anime',
      },
    });

    return response.data.results.map((anime) => ({
      id: anime.id,
      title: anime.title,
      imageUrl: anime.image_url,
      synopsis: anime.synopsis,
    }));
  } catch (error) {
    console.error('Error searching for anime:', error);
    throw error;
  }
}

async function getAnimeData(animeTitle, streamingService) {
  try {
    if (streamingService === 'crunchyroll') {
      const response = await crunchyrollApi.get(`/anime/${animeTitle}`);
      return {
        id: response.data.data.id,
        title: response.data.data.title,
        imageUrl: response.data.data.image_url,
        synopsis: response.data.data.synopsis,
        episodeCount: response.data.data.episode_count,
      };
    }

    if (streamingService === 'funimation') {
      const response = await funimationApi.get('/anime', {
        params: {
          q: animeTitle,
        },
      });
      return {
        id: response.data.data[0].id,
        title: response.data.data[0].title,
        imageUrl: response.data.data[0].image_url,
        synopsis: response.data.data[0].synopsis,
        episodeCount: response.data.data[0].episode_count,
      };
    }

    if (streamingService === 'netflix') {
      const response = await netflixApi.get('/catalog/titles', {
        params: {
          title: animeTitle,
        },
      });
      return {
        id: response.data.results[0].id,
        title: response.data.results[0].title,
        imageUrl: response.data.results[0].poster_url,
        synopsis: response.data.results[0].description,
        episodeCount: response.data.results[0].season_count,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error getting anime data for ${animeTitle}:`, error);
    throw error;
  }
}

async function getAnimeEpisode(animeId, episodeNumber, streamingService) {
  try {
    if (streamingService === 'crunchyroll') {
      const response = await crunchyrollApi.get(`/anime/${animeId}/episodes`);
      const episode = response.data.data.find((ep) => ep.number === episodeNumber);
      if (episode) {
        return episode.url;
      }
    }

    if (streamingService === 'funimation') {
      const response = await funimationApi.get(`/anime/${animeId}/episodes`);
      const episode = response.data.data.find((ep) => ep.number === episodeNumber);
      if (episode) {
        return episode.url;
      }
    }

    if (streamingService === 'netflix') {
      const response = await netflixApi.get(`/catalog/titles/${animeId}/episodes`);
      const episode = response.data.results.find((ep) => ep.episode_number === episodeNumber);
      if (episode) {
        return episode.url;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting episode ${episodeNumber} for anime ${animeId}:`, error);
    throw error;
  }
}

async function getAnimeHistory(guildId) {
  try {
    const queue = await getQueue(guildId);
    if (!queue) {
      return [];
    }
    return queue.history.map((anime) => ({
      title: anime.title,
      episodeNumber: anime.episodeNumber,
      timestamp: anime.timestamp,
    }));
  } catch (error) {
    console.error(`Error getting anime history for guild ${guildId}:`, error);
    throw error;
  }
}

module.exports = {
  searchAnime,
  getAnimeData,
  getAnimeEpisode,
  getAnimeHistory,
};
const express = require('express');
const router = express.Router();
const { getQueue, addAnimeToQueue, playAnime, skipQueue, clearQueue, setVolume, toggleLoop, shuffleQueue } = require('../services/queueService');
const { getUser, updateUser } = require('../services/userService');
const { getAnimeData, getAnimeEpisode, searchAnime } = require('../services/animeService');

// Route for adding an anime to the queue
router.post('/queue', async (req, res) => {
  try {
    const { guildId, animeTitle, episodeNumber, source, requestedBy } = req.body;

    // Validate input
    if (!guildId || !animeTitle) {
      return res.status(400).json({ error: 'Guild ID and anime title are required.' });
    }

    await addAnimeToQueue(guildId, animeTitle, episodeNumber, source, requestedBy);
    return res.status(200).json({ message: 'Anime added to the queue.' });
  } catch (error) {
    console.error('Error adding anime to queue:', error);
    return res.status(500).json({ error: 'An error occurred while adding the anime to the queue.' });
  }
});

// Route for starting anime playback
router.post('/play', async (req, res) => {
  try {
    const { guildId } = req.body;

    // Validate input
    if (!guildId) {
      return res.status(400).json({ error: 'Guild ID is required.' });
    }

    await playAnime(guildId);
    return res.status(200).json({ message: 'Anime playback started.' });
  } catch (error) {
    console.error('Error starting anime playback:', error);
    return res.status(500).json({ error: 'An error occurred while starting anime playback.' });
  }
});

// Route for skipping the current anime episode
router.post('/skip', async (req, res) => {
  try {
    const { guildId } = req.body;

    // Validate input
    if (!guildId) {
      return res.status(400).json({ error: 'Guild ID is required.' });
    }

    await skipQueue(guildId);
    return res.status(200).json({ message: 'Skipped to the next anime episode.' });
  } catch (error) {
    console.error('Error skipping anime episode:', error);
    return res.status(500).json({ error: 'An error occurred while skipping the anime episode.' });
  }
});

// Route for stopping anime playback
router.post('/stop', async (req, res) => {
  try {
    const { guildId } = req.body;

    // Validate input
    if (!guildId) {
      return res.status(400).json({ error: 'Guild ID is required.' });
    }

    await clearQueue(guildId);
    return res.status(200).json({ message: 'Anime playback stopped.' });
  } catch (error) {
    console.error('Error stopping anime playback:', error);
    return res.status(500).json({ error: 'An error occurred while stopping anime playback.' });
  }
});

// Route for setting the playback volume
router.post('/volume', async (req, res) => {
  try {
    const { guildId, volume } = req.body;

    // Validate input
    if (!guildId || !volume) {
      return res.status(400).json({ error: 'Guild ID and volume are required.' });
    }

    await setVolume(guildId, volume);
    return res.status(200).json({ message: `Volume set to ${volume}%` });
  } catch (error) {
    console.error('Error setting volume:', error);
    return res.status(500).json({ error: 'An error occurred while setting the volume.' });
  }
});

// Route for toggling loop mode
router.post('/loop', async (req, res) => {
  try {
    const { guildId, loopType } = req.body;

    // Validate input
    if (!guildId || !loopType) {
      return res.status(400).json({ error: 'Guild ID and loop type are required.' });
    }

    await toggleLoop(guildId, loopType);
    return res.status(200).json({ message: `Loop mode toggled to ${loopType}.` });
  } catch (error) {
    console.error('Error toggling loop mode:', error);
    return res.status(500).json({ error: 'An error occurred while toggling loop mode.' });
  }
});

// Route for shuffling the queue
router.post('/shuffle', async (req, res) => {
  try {
    const { guildId } = req.body;

    // Validate input
    if (!guildId) {
      return res.status(400).json({ error: 'Guild ID is required.' });
    }

    await shuffleQueue(guildId);
    return res.status(200).json({ message: 'Anime queue shuffled.' });
  } catch (error) {
    console.error('Error shuffling queue:', error);
    return res.status(500).json({ error: 'An error occurred while shuffling the queue.' });
  }
});

// Route for searching for an anime
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Validate input
    if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const searchResults = await searchAnime(query);
    return res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error('Error searching for anime:', error);
    return res.status(500).json({ error: 'An error occurred while searching for anime.' });
  }
});

// Route for getting anime data
router.get('/anime/:animeTitle', async (req, res) => {
  try {
    const { animeTitle } = req.params;
    const { source } = req.query;

    // Validate input
    if (!animeTitle) {
      return res.status(400).json({ error: 'Anime title is required.' });
    }

    const animeData = await getAnimeData(animeTitle, source);
    return res.status(200).json({ data: animeData });
  } catch (error) {
    console.error(`Error getting anime data for ${animeTitle}:`, error);
    return res.status(500).json({ error: `An error occurred while getting anime data for ${animeTitle}.` });
  }
});

// Route for getting an anime episode
router.get('/anime/:animeId/episode/:episodeNumber', async (req, res) => {
  try {
    const { animeId, episodeNumber } = req.params;
    const { source } = req.query;

    // Validate input
    if (!animeId || !episodeNumber) {
      return res.status(400).json({ error: 'Anime ID and episode number are required.' });
    }

    const episodeUrl = await getAnimeEpisode(animeId, episodeNumber, source);
    return res.status(200).json({ url: episodeUrl });
  } catch (error) {
    console.error(`Error getting episode ${episodeNumber} for anime ${animeId}:`, error);
    return res.status(500).json({ error: `An error occurred while getting episode ${episodeNumber} for anime ${animeId}.` });
  }
});

// Route for getting user data
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const userData = await getUser(userId);
    return res.status(200).json({ data: userData });
  } catch (error) {
    console.error('Error getting user data:', error);
    return res.status(500).json({ error: 'An error occurred while getting user data.' });
  }
});

// Route for updating user data
router.put('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userData } = req.body;

    // Validate input
    if (!userId || !userData) {
      return res.status(400).json({ error: 'User ID and user data are required.' });
    }

    const updatedUserData = await updateUser(userId, userData);
    return res.status(200).json({ data: updatedUserData });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ error: 'An error occurred while updating user data.' });
  }
});

module.exports = router;
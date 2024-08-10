const express = require('express');
const router = express.Router();
const { getQueue, addAnimeToQueue, playAnime, skipQueue, clearQueue, setVolume } = require('../services/queueService');

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

module.exports = router;
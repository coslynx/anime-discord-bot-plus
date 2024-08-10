const { CRUNCHYROLL_API_BASE_URL, FUNIMATION_API_BASE_URL, NETFLIX_API_BASE_URL, DEFAULT_STREAMING_SERVICE } = require('./constants');

/
  Returns the base URL for the specified streaming service.
 
  @param {string} streamingService The name of the streaming service.
  @returns {string} The base URL for the streaming service.
 /
const getStreamingServiceBaseUrl = (streamingService) => {
  switch (streamingService) {
    case 'crunchyroll':
      return CRUNCHYROLL_API_BASE_URL;
    case 'funimation':
      return FUNIMATION_API_BASE_URL;
    case 'netflix':
      return NETFLIX_API_BASE_URL;
    default:
      return CRUNCHYROLL_API_BASE_URL; // Default to Crunchyroll
  }
};

/
  Returns the name of the preferred streaming service for the given user.
 
  @param {string} userId The ID of the user.
  @returns {Promise<string>} The name of the preferred streaming service.
 /
const getPreferredStreamingService = async (userId) => {
  try {
    const user = await getUser(userId);

    if (user && user.preferredService) {
      return user.preferredService;
    }

    return DEFAULT_STREAMING_SERVICE; // Default to Crunchyroll
  } catch (error) {
    console.error('Error getting preferred streaming service:', error);
    return DEFAULT_STREAMING_SERVICE; // Return default service in case of error
  }
};

/
  Returns the streaming service object based on the given service name.
 
  @param {string} streamingServiceName The name of the streaming service.
  @returns {{ baseURL: string, apiKey: string }} The streaming service object.
 /
const getStreamingService = (streamingServiceName) => {
  switch (streamingServiceName) {
    case 'crunchyroll':
      return { baseURL: CRUNCHYROLL_API_BASE_URL, apiKey: CRUNCHYROLL_API_KEY };
    case 'funimation':
      return { baseURL: FUNIMATION_API_BASE_URL, apiKey: FUNIMATION_API_KEY };
    case 'netflix':
      return { baseURL: NETFLIX_API_BASE_URL, apiKey: NETFLIX_API_KEY };
    default:
      return { baseURL: CRUNCHYROLL_API_BASE_URL, apiKey: CRUNCHYROLL_API_KEY }; // Default to Crunchyroll
  }
};

module.exports = {
  getStreamingServiceBaseUrl,
  getPreferredStreamingService,
  getStreamingService,
};
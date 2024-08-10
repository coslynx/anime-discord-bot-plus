const { verifyToken } = require('../utils/auth');
const { getUser } = require('../../services/userService');
const { handleError } = require('../utils/errorHandler');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required.' });
    }

    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;

    const user = await getUser(userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid authorization token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    handleError(error, null, null);
    return res.status(500).json({ error: 'An error occurred during authorization.' });
  }
};
const jwt = require('jsonwebtoken');
const config = require('config');

function authenticateToken(req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ message: 'You are not logged in. Please provide a valid token.' });
  }

  if (!tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format. Please use the "Bearer" format.' });
  }

  const token = tokenHeader.slice(7);

  jwt.verify(token, config.get('jwtSecretKey'), (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

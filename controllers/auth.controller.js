const jwt = require('jsonwebtoken');
const config = require('config');


async function authenticateUser(username, password) {
  try {
    
    if (username !== dummyUser.username) {
      throw new Error(`Incorrect Username. Username  = ${dummyUser.username} &password =${dummyUser.password} and enter one is ${username } and ${password}`);
    }

    if (password !== dummyUser.password) {
      throw new Error('Incorrect password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, config.get('jwtSecretKey'), { expiresIn: '1h' });

    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  authenticateUser,
};

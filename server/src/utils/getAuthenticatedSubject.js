const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../config/constants');

module.exports = req =>
  new Promise((resolve, reject) => {
    jwt.verify(req.cookies.auth, JWT_SECRET_KEY, (error, subject) => {
      if (error) {
        reject(error);
      } else {
        resolve(subject);
      }
    });
  });

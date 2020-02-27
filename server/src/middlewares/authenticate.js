const AuthenticationError = require('../errors/AuthenticationError');
const hasAuthToken = require('../utils/hasAuthToken');
const getAuthenticatedSubject = require('../utils/getAuthenticatedSubject');

module.exports = async (req, res, next) => {
  if (hasAuthToken(req)) {
    getAuthenticatedSubject(req)
      .then(tokenSubject => {
        req.subject = tokenSubject;
        next();
      })
      .catch(error => next(error));
  } else {
    next(
      new AuthenticationError('Unauthorized user:token was not found.', 401)
    );
  }
};

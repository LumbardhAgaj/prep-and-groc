const getUser = require('../utils/getUser');
const hasAuthToken = require('../utils/hasAuthToken');
const getAuthenticatedSubject = require('../utils/getAuthenticatedSubject');

module.exports = (req, res, next) => {
  if (hasAuthToken(req)) {
    getAuthenticatedSubject(req)
      .then(tokenSubject => getUser(tokenSubject.id))
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
};

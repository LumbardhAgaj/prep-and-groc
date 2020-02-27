const getUser = require('../utils/getUser');

module.exports = (req, res, next) => {
  getUser(req.subject.id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => next(error));
};

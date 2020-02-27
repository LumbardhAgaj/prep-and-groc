const mongoose = require('mongoose');
const ValueError = require('../errors/ValueError');

module.exports = (req, res, next, id) => {
  try {
    mongoose.Types.ObjectId(id);
    next();
  } catch (error) {
    next(new ValueError('Invalid item id'));
  }
};

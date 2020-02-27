const expressLoader = require('./express');
const databaseLoader = require('./database');
const subscribersLoader = require('./subscribers');

module.exports = async app => {
  expressLoader(app);
  databaseLoader();
  subscribersLoader();
};

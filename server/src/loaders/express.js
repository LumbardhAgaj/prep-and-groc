const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const routes = require('../routes');
const { NODE_ENV } = require('../config/constants');
const errorHandler = require('../middlewares/errorHandler');
const invalidJsonErrorHandler = require('../middlewares/invalidJsonErrorHandler');

module.exports = app => {
  // Add middlewares
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json()); // built-in express MW
  app.use(express.urlencoded({ extended: false })); // built-in express MW
  app.use(cookieParser()); // third-party express MW
  app.use(express.static('./public'));

  // Define application routes;
  app.use('/', routes);

  if (NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve('public', 'index.html'));
    });
  } else {
    app.all('*', (req, res) => {
      res.status(404);
      res.send({ error: true, message: 'Page not found.' });
    });
  }

  // Handle errors;
  app.use(invalidJsonErrorHandler);
  app.use(errorHandler);
};

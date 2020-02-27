const express = require('express');
const userController = require('../controllers/user');
const authenticateMiddleware = require('../middlewares/authenticate');
const attachUserMiddleware = require('../middlewares/attachUser');
const validateLoginCredentialsMiddleware = require('../middlewares/validateLoginCredentials');
const validateUserMiddleware = require('../middlewares/validateUser');
const asyncRoute = require('../utils/asyncRoute');

const router = new express.Router();

router.post(
  '/users/signup',
  validateUserMiddleware,
  asyncRoute(userController.signup)
);
router.post(
  '/users/login',
  validateLoginCredentialsMiddleware,
  asyncRoute(userController.login)
);
router.post(
  '/users/logout',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(userController.logout)
);
router.get(
  '/users/me',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(userController.authenticatedUser)
);

module.exports = router;

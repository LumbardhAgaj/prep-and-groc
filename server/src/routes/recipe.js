const express = require('express');
const recipeController = require('../controllers/recipe');
const authenticateMiddleware = require('../middlewares/authenticate');
const attachUserMiddleware = require('../middlewares/attachUser');
const attachUserIfAuthenticatedMiddleware = require('../middlewares/attachUserIfAuthenticated');
const attachRecipeMiddleware = require('../middlewares/attachRecipe');
const validateIngredientsUnitConversionMiddleware = require('../middlewares/validateIngredientsUnitConversion');
const validateRecipeIngredientsUnitValuesMiddleware = require('../middlewares/validateRecipeIngredientsUnitValues');
const validateObjectIdParameterMiddleware = require('../middlewares/validateObjectIdParameter');
const validateDuplicateIngredients = require('../middlewares/validateDuplicateIngredients');
const validateRecipeMiddleware = require('../middlewares/validateRecipe');
const asyncRoute = require('../utils/asyncRoute');

const router = new express.Router();
router.param('id', validateObjectIdParameterMiddleware);

router.get(
  '/recipes',
  attachUserIfAuthenticatedMiddleware,
  asyncRoute(recipeController.list)
);
router.get(
  '/recipes/:id',
  attachUserIfAuthenticatedMiddleware,
  asyncRoute(recipeController.show)
);
router.post(
  '/recipes/',
  authenticateMiddleware,
  attachUserMiddleware,
  validateRecipeMiddleware,
  validateDuplicateIngredients,
  validateRecipeIngredientsUnitValuesMiddleware,
  asyncRoute(recipeController.save)
);
router.put(
  '/recipes/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(recipeController.edit)
);
router.delete(
  '/recipes/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(recipeController.delete)
);
router.get(
  '/recipes/prepare/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  attachRecipeMiddleware,
  validateIngredientsUnitConversionMiddleware,
  asyncRoute(recipeController.prepare)
);

router.get('/ingredients', asyncRoute(recipeController.listIngredients));

module.exports = router;

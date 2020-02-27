const express = require('express');
const fridgeIngredientController = require('../controllers/fridgeIngredient');
const authenticateMiddleware = require('../middlewares/authenticate');
const attachUserMiddleware = require('../middlewares/attachUser');
const validateObjectIdParameterMiddleware = require('../middlewares/validateObjectIdParameter');
const validateFridgeIngredientMiddleware = require('../middlewares/validateFridgeIngredient');
const validateFridgeIngredientUnitConversionMiddleware = require('../middlewares/validateFridgeIngredientUnitConversion');
const asyncRoute = require('../utils/asyncRoute');

const router = new express.Router();
router.param('id', validateObjectIdParameterMiddleware);

router.get(
  '/fridge/ingredients',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(fridgeIngredientController.list)
);
router.post(
  '/fridge/ingredients',
  authenticateMiddleware,
  attachUserMiddleware,
  validateFridgeIngredientMiddleware,
  validateFridgeIngredientUnitConversionMiddleware,
  asyncRoute(fridgeIngredientController.save)
);
router.delete(
  '/fridge/ingredients/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(fridgeIngredientController.delete)
);

module.exports = router;

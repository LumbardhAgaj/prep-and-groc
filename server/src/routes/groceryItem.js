const express = require('express');
const groceryItemController = require('../controllers/groceryItem');
const authenticateMiddleware = require('../middlewares/authenticate');
const attachUserMiddleware = require('../middlewares/attachUser');
const validateGroceryItemsMiddleware = require('../middlewares/validateGroceryItems');
const validateIngredientsUnitConversionMiddleware = require('../middlewares/validateIngredientsUnitConversion');
const validateObjectIdParameterMiddleware = require('../middlewares/validateObjectIdParameter');
const validateDuplicateIngredients = require('../middlewares/validateDuplicateIngredients');

const asyncRoute = require('../utils/asyncRoute');

const router = new express.Router();
router.param('id', validateObjectIdParameterMiddleware);

router.get(
  '/grocery/items',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(groceryItemController.list)
);
router.post(
  '/grocery/items/save-or-update-many',
  authenticateMiddleware,
  attachUserMiddleware,
  validateDuplicateIngredients,
  validateGroceryItemsMiddleware,
  validateIngredientsUnitConversionMiddleware,
  asyncRoute(groceryItemController.saveOrUpdateMany)
);
router.put(
  '/grocery/items/mark-complete/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(groceryItemController.markComplete)
);
router.delete(
  '/grocery/items/:id',
  authenticateMiddleware,
  attachUserMiddleware,
  asyncRoute(groceryItemController.delete)
);

module.exports = router;

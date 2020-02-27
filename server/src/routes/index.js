const express = require('express');

const router = new express.Router();

const fridgeIngredientRoutes = require('./fridgeIngredient');
const groceryItemRoutes = require('./groceryItem');
const recipeRoutes = require('./recipe');
const userRecipeRoutes = require('./userRecipe');
const userRoutes = require('./user');

router.use('/', fridgeIngredientRoutes);
router.use('/', groceryItemRoutes);
router.use('/', recipeRoutes);
router.use('/', userRecipeRoutes);
router.use('/', userRoutes);

module.exports = router;

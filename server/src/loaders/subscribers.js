const groceryItemSubscribers = require('../subscribers/groceryItem');
const fridgeIngredientSubscribers = require('../subscribers/fridgeIngredient');
const recipeSubscribers = require('../subscribers/recipe');

module.exports = () => {
  recipeSubscribers();
  fridgeIngredientSubscribers();
  groceryItemSubscribers();
};

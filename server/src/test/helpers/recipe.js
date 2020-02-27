const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

const saveRecipe = (recipe, ownerId) => {
  const newRecipe = new Recipe({ ...recipe, owner: ownerId });
  return newRecipe.save();
};

const deleteRecipe = title => Recipe.findOneAndDelete({ title });

const addRecipeToUserCollection = (recipeId, userId) =>
  User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), {
    $push: { recipes: mongoose.Types.ObjectId(recipeId) }
  });

const removeRecipeFromUserCollection = (recipeId, userId) =>
  User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), {
    $pull: { recipes: mongoose.Types.ObjectId(recipeId) }
  });

module.exports = {
  saveRecipe,
  deleteRecipe,
  addRecipeToUserCollection,
  removeRecipeFromUserCollection
};

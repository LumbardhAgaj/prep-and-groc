const User = require('../../models/user');

const saveFridgeIngredient = (item, userId) =>
  User.findByIdAndUpdate(userId, { $push: { fridge: item } });

const deleteFridgeIngredient = (_id, userId) =>
  User.findByIdAndUpdate(userId, { $pull: { fridge: { _id } } });

const deleteAllFridgeIngredients = userId =>
  User.findByIdAndUpdate(userId, { $set: { fridge: [] } });

module.exports = {
  saveFridgeIngredient,
  deleteFridgeIngredient,
  deleteAllFridgeIngredients
};

const User = require('../../models/user');

const saveGroceryItems = (groceryItems, userId) =>
  User.findByIdAndUpdate(userId, {
    $push: { groceries: { $each: groceryItems } }
  });

const deleteGroceryItems = (groceryItems, userId) => {
  const groceryItemsIds = groceryItems.map(item => item._id);
  return User.findByIdAndUpdate(userId, {
    $pull: { groceries: { _id: { $in: groceryItemsIds } } }
  });
};

const deleteAllGroceryItems = userId =>
  User.findByIdAndUpdate(userId, { $set: { groceries: [] } });

module.exports = {
  saveGroceryItems,
  deleteGroceryItems,
  deleteAllGroceryItems
};

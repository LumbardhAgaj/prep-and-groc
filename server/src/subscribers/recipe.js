/* eslint-disable no-console */
const eventEmitterDecorator = require('../decorators/eventEmitter');
const { DELETE_RECIPE } = require('./events');
const UserModel = require('../models/user');

const removeFromAllCollections = async recipeId => {
  try {
    await UserModel.updateMany({}, { $pull: { recipes: recipeId } });
  } catch (error) {
    console.error(error);
  }
};

module.exports = () => {
  eventEmitterDecorator.subscribe(DELETE_RECIPE, removeFromAllCollections);
};

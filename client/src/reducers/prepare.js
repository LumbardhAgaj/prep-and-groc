import {
  ADD_RECIPE_TO_PREPARE,
  REMOVE_PREPARED_RECIPE
} from 'constants/actionTypes';

const PREPARE_INIT_STATE = null;

export default (state, action) => {
  switch (action.type) {
    case ADD_RECIPE_TO_PREPARE: {
      return action.id;
    }
    case REMOVE_PREPARED_RECIPE: {
      return null;
    }
    default:
      return state;
  }
};

export { PREPARE_INIT_STATE };

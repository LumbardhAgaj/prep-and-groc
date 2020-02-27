import {
  modalItemsFetchInit,
  modalItemsFetchFailure,
  modalItemsFetchSuccess
} from './modal';
import { RECIPES_PREPARE_ROUTE } from 'constants/applicationRoutes';
import handleFetch from 'utils/handleFetch';
import {
  ADD_RECIPE_TO_PREPARE,
  REMOVE_PREPARED_RECIPE
} from 'constants/actionTypes';

const prepareRecipe = id => dispatch => {
  dispatch(modalItemsFetchInit());
  handleFetch(`${RECIPES_PREPARE_ROUTE}/${id}`)
    .then(response => dispatch(modalItemsFetchSuccess(response)))
    .catch(error => dispatch(modalItemsFetchFailure(error)));
};

const addRecipeToPrepare = id => ({ type: ADD_RECIPE_TO_PREPARE, id });

const removePreparedRecipe = () => ({ type: REMOVE_PREPARED_RECIPE });

export { prepareRecipe, addRecipeToPrepare, removePreparedRecipe };

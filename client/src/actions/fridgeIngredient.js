import { addPageItem, removePageItem } from './page';
import { addSuccessToast } from './notification';
import handleFetch from 'utils/handleFetch';
import handleFetchError from 'utils/handleFetchError';
import { FRIDGE_INGREDIENTS_ROUTE } from 'constants/applicationRoutes';
import {
  SAVE_FRIDGE_INGREDIENT_MESSAGE,
  DELETE_FRIDGE_INGREDIENT_MESSAGE
} from 'constants/userMessages';
import { VALIDATION_ERROR } from 'constants/errorNames';

const saveFridgeIngredient = (
  ingredient,
  setValidationError,
  resetForm,
  setSubmitting
) => (dispatch, notify, state) => {
  setSubmitting(true);
  handleFetch(FRIDGE_INGREDIENTS_ROUTE, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(ingredient)
  })
    .then(savedIngredient => {
      resetForm();
      addPageItem(savedIngredient)(dispatch, state);
      notify(addSuccessToast(SAVE_FRIDGE_INGREDIENT_MESSAGE));
    })
    .catch(error => {
      if (error.name === VALIDATION_ERROR) {
        setValidationError(error.errors);
      } else {
        handleFetchError({ dispatch, notify })(error);
      }
    })
    .finally(setSubmitting(false));
};

const deleteFridgeIngredient = (ingredientId, setIsDisabled) => (
  dispatch,
  notify,
  state
) => {
  setIsDisabled(true);
  handleFetch(`${FRIDGE_INGREDIENTS_ROUTE}/${ingredientId}`, {
    method: 'DELETE'
  })
    .then(() => {
      removePageItem(ingredientId)(dispatch, state);
      notify(addSuccessToast(DELETE_FRIDGE_INGREDIENT_MESSAGE));
    })
    .catch(handleFetchError({ dispatch, notify, setIsDisabled }));
};

export { saveFridgeIngredient, deleteFridgeIngredient };

import { removePageItem, updatePageItem } from './page';
import { addSuccessToast } from './notification';
import handleFetch from 'utils/handleFetch';
import handleFetchError from 'utils/handleFetchError';
import handleFetchErrorInUnprotectedRoute from 'utils/handleFetchErrorInUnprotectedRoute';
import { USER_RECIPES_ROUTE, RECIPES_ROUTE } from 'constants/applicationRoutes';
import {
  SAVE_RECIPE_MESSAGE,
  DELETE_RECIPE_MESSAGE,
  ADD_RECIPE_MESSAGE,
  REMOVE_RECIPE_MESSAGE
} from 'constants/userMessages';
import browserHistory from 'utils/browserHistory';

const deleteRecipe = recipeId =>
  handleFetch(`${RECIPES_ROUTE}/${recipeId}`, { method: 'DELETE' });

const addRecipeToUserCollection = recipeId =>
  handleFetch(`${USER_RECIPES_ROUTE}/${recipeId}`, { method: 'PUT' });

const removeRecipeFromUserCollection = recipeId =>
  handleFetch(`${USER_RECIPES_ROUTE}/${recipeId}`, { method: 'DELETE' });

const saveRecipe = (recipe, setSubmitting) => (dispatch, notify) => {
  setSubmitting(true);
  handleFetch(RECIPES_ROUTE, {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      browserHistory.push('/myrecipes');
      notify(addSuccessToast(SAVE_RECIPE_MESSAGE));
    })
    .catch(
      handleFetchError({ dispatch, notify, setIsDisabled: setSubmitting })
    );
};

const addRecipeToCollectionFromHomePage = (
  recipeId,
  addCardRecipeSuccessToast,
  setIsDisabled
) => (dispatch, notify) => {
  setIsDisabled(true);
  addRecipeToUserCollection(recipeId)
    .then(() => {
      dispatch(updatePageItem(recipeId, 'isSaved', true));
      addCardRecipeSuccessToast();
    })
    .catch(
      handleFetchErrorInUnprotectedRoute({ dispatch, notify, setIsDisabled })
    );
};

const removeCollectedRecipeFromHomePage = (recipeId, setIsDisabled) => (
  dispatch,
  notify
) => {
  setIsDisabled(true);
  removeRecipeFromUserCollection(recipeId)
    .then(() => dispatch(updatePageItem(recipeId, 'isSaved', false)))
    .catch(
      handleFetchErrorInUnprotectedRoute({ dispatch, notify, setIsDisabled })
    );
};

const removeCollectedRecipeFromMyRecipesPage = (recipeId, setIsDisabled) => (
  dispatch,
  notify,
  state
) => {
  setIsDisabled(true);
  removeRecipeFromUserCollection(recipeId)
    .then(() => {
      removePageItem(recipeId)(dispatch, state);
      notify(addSuccessToast(REMOVE_RECIPE_MESSAGE));
    })
    .catch(handleFetchError({ dispatch, notify, setIsDisabled }));
};

const deleteRecipeFromMyRecipesPage = (recipeId, setIsDisabled) => (
  dispatch,
  notify,
  state
) => {
  setIsDisabled(true);
  deleteRecipe(recipeId)
    .then(() => {
      removePageItem(recipeId)(dispatch, state);
      notify(addSuccessToast(DELETE_RECIPE_MESSAGE));
    })
    .catch(handleFetchError({ dispatch, notify, setIsDisabled }));
};

const addRecipeToCollectionFromRecipePage = (recipeId, setIsDisabled) => (
  dispatch,
  notify
) => {
  setIsDisabled(true);
  addRecipeToUserCollection(recipeId)
    .then(() => {
      dispatch(updatePageItem(recipeId, 'isSaved', true));
      notify(addSuccessToast(ADD_RECIPE_MESSAGE));
    })
    .catch(
      handleFetchErrorInUnprotectedRoute({ dispatch, notify, setIsDisabled })
    );
};

const removeCollectedRecipeFromRecipePage = (recipeId, setIsDisabled) => (
  dispatch,
  notify
) => {
  setIsDisabled(true);
  removeRecipeFromUserCollection(recipeId)
    .then(() => {
      dispatch(updatePageItem(recipeId, 'isSaved', false));
      notify(addSuccessToast(REMOVE_RECIPE_MESSAGE));
    })
    .catch(
      handleFetchErrorInUnprotectedRoute({ dispatch, notify, setIsDisabled })
    );
};

const deleteRecipeFromRecipePage = (recipeId, setIsDisabled) => (
  dispatch,
  notify
) => {
  setIsDisabled(true);
  deleteRecipe(recipeId)
    .then(() => {
      browserHistory.push('/myrecipes');
      notify(addSuccessToast(DELETE_RECIPE_MESSAGE));
    })
    .catch(
      handleFetchErrorInUnprotectedRoute({ dispatch, notify, setIsDisabled })
    );
};

export {
  saveRecipe,
  addRecipeToCollectionFromHomePage,
  removeCollectedRecipeFromHomePage,
  deleteRecipeFromMyRecipesPage,
  removeCollectedRecipeFromMyRecipesPage,
  addRecipeToCollectionFromRecipePage,
  removeCollectedRecipeFromRecipePage,
  deleteRecipeFromRecipePage
};

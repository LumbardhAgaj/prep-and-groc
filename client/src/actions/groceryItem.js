import { removePageItem, updatePageItem } from './page';
import { hideModal } from './modal';
import { addSuccessToast } from './notification';
import handleFetch from 'utils/handleFetch';
import handleFetchError from 'utils/handleFetchError';
import {
  GROCERY_ITEMS_ROUTE,
  GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE,
  GROCERY_ITEMS_MARK_COMPLETE_ROUTE
} from 'constants/applicationRoutes';
import {
  DELETE_GROCERY_ITEM_MESSAGE,
  SAVE_GROCERY_ITEMS_MESSAGE
} from 'constants/userMessages';

const markGroceryItemComplete = (itemId, setIsDisabled) => (
  dispatch,
  notify
) => {
  setIsDisabled(true);
  handleFetch(`${GROCERY_ITEMS_MARK_COMPLETE_ROUTE}/${itemId}`, {
    method: 'PUT'
  })
    .then(() => {
      dispatch(updatePageItem(itemId, 'isCompleted', true));
    })
    .catch(error => {
      handleFetchError({ dispatch, notify })(error);
    })
    .finally(() => setIsDisabled(false));
};

const deleteGroceryItem = (itemId, setIsDisabled) => (
  dispatch,
  notify,
  state
) => {
  setIsDisabled(true);
  handleFetch(`${GROCERY_ITEMS_ROUTE}/${itemId}`, {
    method: 'DELETE'
  })
    .then(() => {
      removePageItem(itemId)(dispatch, state);
      notify(addSuccessToast(DELETE_GROCERY_ITEM_MESSAGE));
    })
    .catch(handleFetchError({ dispatch, notify, setIsDisabled }));
};

const saveGroceryItems = (items, setIsDisabled) => (dispatch, notify) => {
  setIsDisabled(true);
  handleFetch(GROCERY_ITEMS_SAVE_OR_UPDATE_MANY_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items)
  })
    .then(() => notify(addSuccessToast(SAVE_GROCERY_ITEMS_MESSAGE)))
    .catch(handleFetchError({ dispatch, notify, setIsDisabled }))
    .finally(() => dispatch(hideModal('prepare-recipe')));
};

export { deleteGroceryItem, markGroceryItemComplete, saveGroceryItems };

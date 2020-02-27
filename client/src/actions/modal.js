import {
  SHOW_MODAL,
  HIDE_MODAL,
  MODAL_ITEMS_FETCH_INIT,
  MODAL_ITEMS_FETCH_FAILURE,
  MODAL_ITEMS_FETCH_SUCCESS
} from 'constants/actionTypes';

const showModal = name => ({
  type: SHOW_MODAL,
  modal: { name, isShown: true }
});

const hideModal = name => ({
  type: HIDE_MODAL,
  modal: { name, isShown: false }
});

const modalItemsFetchInit = () => ({ type: MODAL_ITEMS_FETCH_INIT });

const modalItemsFetchFailure = error => ({
  type: MODAL_ITEMS_FETCH_FAILURE,
  error
});

const modalItemsFetchSuccess = data => ({
  type: MODAL_ITEMS_FETCH_SUCCESS,
  data
});

export {
  showModal,
  hideModal,
  modalItemsFetchInit,
  modalItemsFetchFailure,
  modalItemsFetchSuccess
};

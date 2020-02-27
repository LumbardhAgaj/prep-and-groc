import {
  SHOW_MODAL,
  HIDE_MODAL,
  MODAL_ITEMS_FETCH_INIT,
  MODAL_ITEMS_FETCH_SUCCESS,
  MODAL_ITEMS_FETCH_FAILURE
} from 'constants/actionTypes';

export const MODAL_INIT_STATE = {
  hasError: false,
  isLoading: false,
  items: [],
  name: '',
  isShown: false
};

export default (state = {}, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return { ...state, ...action.modal };
    }
    case HIDE_MODAL: {
      return { ...state, ...action.modal };
    }
    case MODAL_ITEMS_FETCH_INIT: {
      return { ...state, isLoading: true, hasError: null };
    }
    case MODAL_ITEMS_FETCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
        items: []
      };
    }
    case MODAL_ITEMS_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: null,
        items: action.data.items
      };
    }
    default:
      return state;
  }
};

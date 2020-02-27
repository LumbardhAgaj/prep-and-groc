import {
  PAGE_ITEMS_FETCH_INIT,
  PAGE_ITEMS_FETCH_SUCCESS,
  PAGE_ITEMS_FETCH_FAILURE,
  UPDATE_PAGE_ITEM,
  ADD_PAGE_ITEM,
  REMOVE_PAGE_ITEM
} from 'constants/actionTypes';

const PAGINATOR_INIT_STATE = { totalPages: 1, currentPage: 1 };

const PAGE_INIT_STATE = {
  hasError: null,
  isLoading: false,
  items: [],
  paginator: PAGINATOR_INIT_STATE
};

const updatePageItem = action => item => {
  if (item._id === action.item.id) {
    const updatedItem = { ...item };
    updatedItem[action.item.propertyName] = action.item.propertyValue;
    return updatedItem;
  }
  return item;
};

export default (state, action) => {
  switch (action.type) {
    case PAGE_ITEMS_FETCH_INIT: {
      return { ...state, hasError: null, isLoading: true };
    }
    case PAGE_ITEMS_FETCH_SUCCESS: {
      return {
        ...state,
        hasError: null,
        isLoading: false,
        items: action.data.items,
        paginator: {
          totalPages: action.data.totalPages,
          currentPage: action.data.currentPage
        }
      };
    }
    case PAGE_ITEMS_FETCH_FAILURE: {
      return {
        ...state,
        hasError: action.error,
        isLoading: false,
        items: [],
        paginator: PAGINATOR_INIT_STATE
      };
    }
    case UPDATE_PAGE_ITEM: {
      if (Array.isArray(state.items)) {
        return { ...state, items: state.items.map(updatePageItem(action)) };
      } else {
        return { ...state, items: updatePageItem(action)(state.items) };
      }
    }
    case ADD_PAGE_ITEM: {
      return { ...state, items: state.items.concat(action.item) };
    }
    case REMOVE_PAGE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.id)
      };
    }
    default:
      return state;
  }
};

export { PAGE_INIT_STATE };

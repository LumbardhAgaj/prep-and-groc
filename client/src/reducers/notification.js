import { ADD_TOAST, REMOVE_TOAST } from 'constants/actionTypes';

const NOTIFICATIONS_INIT_STATE = {
  toasts: []
};

export default (state, action) => {
  switch (action.type) {
    case ADD_TOAST: {
      return {
        ...state,
        toasts: state.toasts.concat(action.toast)
      };
    }
    case REMOVE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.id)
      };
    }
    default:
      return state;
  }
};

export { NOTIFICATIONS_INIT_STATE };

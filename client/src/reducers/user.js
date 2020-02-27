import { IS_USER_AUTHENTICATED } from 'constants/actionTypes';

const USER_INIT_STATE = {
  isAuthenticated: false
};

export default (state, action) => {
  switch (action.type) {
    case IS_USER_AUTHENTICATED: {
      return { ...state, isAuthenticated: action.isAuthenticated };
    }
    default:
      return state;
  }
};

export { USER_INIT_STATE };

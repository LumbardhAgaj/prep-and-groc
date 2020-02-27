import ObjectID from 'bson-objectid';
import { ADD_TOAST, REMOVE_TOAST } from 'constants/actionTypes';

const addSuccessToast = message => {
  return {
    type: ADD_TOAST,
    toast: {
      id: ObjectID(),
      type: 'success',
      message
    }
  };
};

const addFailureToast = message => {
  return {
    type: ADD_TOAST,
    toast: {
      id: ObjectID(),
      type: 'failure',
      message
    }
  };
};

const removeToast = id => {
  return {
    type: REMOVE_TOAST,
    id
  };
};
export { removeToast, addSuccessToast, addFailureToast };

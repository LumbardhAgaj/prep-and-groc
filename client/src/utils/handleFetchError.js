import { addFailureToast } from 'actions/notification';
import { isUserAuthenticated } from 'actions/user';
import { AUTHENTICATION_ERROR } from 'constants/errorNames';

export default ({ dispatch, notify, setIsDisabled }) => error => {
  if (error.name === AUTHENTICATION_ERROR) {
    dispatch(isUserAuthenticated(false));
  } else {
    notify(addFailureToast(error.message));
  }
  if (setIsDisabled) {
    setIsDisabled(false);
  }
};

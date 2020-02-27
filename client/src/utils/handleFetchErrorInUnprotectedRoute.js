import { addFailureToast } from 'actions/notification';
import { showModal } from 'actions/modal';
import { LOGIN_MODAL } from 'constants/modalNames';
import { AUTHENTICATION_ERROR } from 'constants/errorNames';

export default ({ notify, dispatch, setIsDisabled }) => error => {
  setIsDisabled(false);
  if (error.name === AUTHENTICATION_ERROR) {
    dispatch(showModal(LOGIN_MODAL));
  } else {
    notify(addFailureToast(error.message));
  }
};

import { IS_USER_AUTHENTICATED } from 'constants/actionTypes';
import {
  USER_LOGIN_ROUTE,
  IS_AUTHENTICATED_ROUTE,
  USER_SIGNUP_ROUTE,
  USER_LOGOUT_ROUTE
} from 'constants/applicationRoutes';
import handleFetch from 'utils/handleFetch';
import { addSuccessToast, addFailureToast } from './notification';
import { hideModal } from './modal';
import { SIGNUP_MESSAGE } from 'constants/userMessages';
import browserHistory from 'utils/browserHistory';
import { LOGIN_MODAL } from 'constants/modalNames';
import { AUTHENTICATION_ERROR, VALIDATION_ERROR } from 'constants/errorNames';

const loginUser = (
  credentials,
  setValidationError,
  resetForm,
  setSubmitting
) => (dispatch, notify) => {
  handleFetch(USER_LOGIN_ROUTE, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      resetForm();
      dispatch(hideModal(LOGIN_MODAL));
      dispatch(isUserAuthenticated(true));
    })
    .catch(error => {
      setSubmitting(false);
      if (error.name === VALIDATION_ERROR) {
        setValidationError(error.errors);
      } else {
        notify(addFailureToast(error.message));
      }
    });
};

const logoutUser = setIsDisabled => (dispatch, notify) => {
  setIsDisabled(true);
  handleFetch(USER_LOGOUT_ROUTE, { method: 'POST' })
    .then(() => dispatch(isUserAuthenticated(false)))
    .catch(error => {
      if (error.name === AUTHENTICATION_ERROR) {
        dispatch(isUserAuthenticated(false));
      } else {
        notify(addFailureToast(error.message));
      }
    })
    .finally(() => setIsDisabled(false));
};

const signupUser = (user, setValidationError, resetForm, setSubmitting) => (
  dispatch,
  notify
) => {
  handleFetch(USER_SIGNUP_ROUTE, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      resetForm();
      dispatch(hideModal(LOGIN_MODAL));
      browserHistory.push('/');
      dispatch(isUserAuthenticated(true));
      notify(addSuccessToast(SIGNUP_MESSAGE));
    })
    .catch(error => {
      setSubmitting(false);
      if (error.name === VALIDATION_ERROR) {
        setValidationError(error.errors);
      } else {
        notify(addFailureToast(error.message));
      }
    });
};

const findIsUserAuthenticated = () => dispatch => {
  handleFetch(IS_AUTHENTICATED_ROUTE)
    .then(() => {
      dispatch(isUserAuthenticated(true));
    })
    .catch(error => {
      if (error.name === AUTHENTICATION_ERROR) {
        dispatch(isUserAuthenticated(false));
      }
    });
};

const isUserAuthenticated = isAuthenticated => ({
  type: IS_USER_AUTHENTICATED,
  isAuthenticated
});

export {
  loginUser,
  signupUser,
  logoutUser,
  findIsUserAuthenticated,
  isUserAuthenticated
};

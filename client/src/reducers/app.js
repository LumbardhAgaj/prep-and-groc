import userReducer, { USER_INIT_STATE } from './user';
import prepareReducer, { PREPARE_INIT_STATE } from './prepare';
import modalReducer, { MODAL_INIT_STATE } from './modal';
import pageReducer, { PAGE_INIT_STATE } from './page';

const appReducer = ({ user, prepare, page, modal }, action) => ({
  user: userReducer(user, action),
  prepare: prepareReducer(prepare, action),
  modal: modalReducer(modal, action),
  page: pageReducer(page, action)
});

const APP_INIT_STATE = {
  user: USER_INIT_STATE,
  prepare: PREPARE_INIT_STATE,
  modal: MODAL_INIT_STATE,
  page: PAGE_INIT_STATE
};

export default appReducer;

export { APP_INIT_STATE };

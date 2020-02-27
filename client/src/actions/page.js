import queryString from 'query-string';
import {
  PAGE_ITEMS_FETCH_INIT,
  PAGE_ITEMS_FETCH_SUCCESS,
  PAGE_ITEMS_FETCH_FAILURE,
  UPDATE_PAGE_ITEM,
  ADD_PAGE_ITEM,
  REMOVE_PAGE_ITEM
} from 'constants/actionTypes';
import handleFetch from 'utils/handleFetch';
import browserHistory, { getUrlParameters } from 'utils/browserHistory';

const ITEMS_PER_PAGE = 15;

const fetchPageItems = (url, urlParams = '') => dispatch => {
  dispatch(pageItemsFetchInit(url));
  handleFetch(`${url}${urlParams}`)
    .then(response => dispatch(pageItemsFetchSuccess(response)))
    .catch(error => dispatch(pageItemsFetchFailure(error)));
};

const pageItemsFetchInit = () => ({
  type: PAGE_ITEMS_FETCH_INIT
});

const pageItemsFetchSuccess = data => ({
  type: PAGE_ITEMS_FETCH_SUCCESS,
  data
});

const pageItemsFetchFailure = error => ({
  type: PAGE_ITEMS_FETCH_FAILURE,
  error
});

const updatePageItem = (id, propertyName, propertyValue) => ({
  type: UPDATE_PAGE_ITEM,
  item: { id, propertyName, propertyValue }
});

const isLastPageItemRemoved = pageItems => pageItems.length <= 1;

const isLastPageRemoved = totalPages => totalPages <= 1;

const isPageFull = pageItems => pageItems.length > ITEMS_PER_PAGE;

const removePageItem = id => (dispatch, { page }) => {
  const { items, paginator } = page;
  const { currentPage, totalPages } = paginator;
  if (isLastPageItemRemoved(items) && !isLastPageRemoved(totalPages)) {
    updateUrlPageParameterOnPageItemsRemove(currentPage);
  } else {
    dispatch({ type: REMOVE_PAGE_ITEM, id });
  }
};

const addPageItem = item => (dispatch, { page }) => {
  const { items, paginator } = page;
  if (isPageFull(items)) {
    updateUrlQueryParameter('page', paginator.currentPage + 1);
  } else {
    dispatch({ type: ADD_PAGE_ITEM, item });
  }
};

const updateUrlQueryParameter = (name, value) => {
  const { pathname } = browserHistory.location;
  const urlParameters = getUrlParameters();
  if (name !== 'page') {
    delete urlParameters.page;
  }
  urlParameters[name] = value;
  const updatedUrlParameters = queryString.stringify(urlParameters);
  const updatedBrowserUrl = `${pathname}?${updatedUrlParameters}`;
  browserHistory.replace(updatedBrowserUrl);
};

const updateUrlPageParameterOnPageItemsRemove = currentPage => {
  const urlParameters = getUrlParameters();
  if (currentPage > 1) {
    updateUrlQueryParameter('page', currentPage - 1);
  } else {
    if (urlParameters.page) {
      updateUrlQueryParameter('page');
    } else {
      updateUrlQueryParameter('page', 1);
    }
  }
};

export {
  fetchPageItems,
  pageItemsFetchInit,
  pageItemsFetchSuccess,
  pageItemsFetchFailure,
  updatePageItem,
  removePageItem,
  addPageItem,
  updateUrlQueryParameter
};

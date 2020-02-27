import { createBrowserHistory } from 'history';
import queryString from 'query-string';

const browserHistory = createBrowserHistory();

const getUrlParameters = () => {
  const { search } = browserHistory.location;
  return queryString.parse(search);
};

export { getUrlParameters };
export default browserHistory;

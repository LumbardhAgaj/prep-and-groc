import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default parameterName => {
  const { search } = useLocation();
  return queryString.parse(search)[parameterName];
};

import {
  RESPONSE_FORMAT_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE
} from 'constants/userMessages';
import { UNKNOWN_ERROR, RESPONSE_FORMAT_ERROR } from 'constants/errorNames';

const getErrorResponseObject = (type, message) => ({
  error: true,
  type,
  message
});

const hasResponseContent = response => response.status !== 204;

const hasResponseError = response => response.error;

export default (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const handleFetchResponse = response =>
      hasResponseError(response) ? reject(response) : resolve(response);

    const handleFetchError = error => {
      if (error instanceof SyntaxError) {
        reject(
          getErrorResponseObject(
            RESPONSE_FORMAT_ERROR,
            RESPONSE_FORMAT_ERROR_MESSAGE
          )
        );
      } else {
        reject(getErrorResponseObject(UNKNOWN_ERROR, UNKNOWN_ERROR_MESSAGE));
      }
    };

    fetch(url, options)
      .then(response => (hasResponseContent(response) ? response.json() : {}))
      .then(handleFetchResponse)
      .catch(handleFetchError);
  });
};

import { UNKNOWN_ERROR_MESSAGE } from 'constants/userMessages';
const successFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
    status: 200
  });

const failFetchResponse = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ error: true, message: UNKNOWN_ERROR_MESSAGE }),
    status: 400
  });

const emptyItemsFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve({ items: [] }),
    status: 200
  });

const pageItemsFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve({ items: [] }),
    status: 200
  });

const paginatorFetchResonse = (totalPages, currentPage) => () =>
  Promise.resolve({
    json: () => Promise.resolve({ items: [], totalPages, currentPage }),
    status: 200
  });

export {
  successFetchResponse,
  failFetchResponse,
  emptyItemsFetchResponse,
  pageItemsFetchResponse,
  paginatorFetchResonse
};

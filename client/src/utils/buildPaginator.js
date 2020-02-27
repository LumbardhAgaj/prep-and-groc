import ObjectID from 'bson-objectid';
const PAGES_TO_DISPLAY = 3;

const buildPaginator = (totalPages = 1, currentPage = 1) => {
  const paginator = [];

  const isItemDisabled = itemPage => currentPage === itemPage;

  const isPageActive = pageNumber => currentPage === pageNumber;

  const addNextPage = () => {
    paginator.push({
      display: '>',
      number: currentPage + 1,
      isDisabled: isItemDisabled(totalPages),
      id: ObjectID().toHexString()
    });
  };

  const addPreviousPage = () => {
    paginator.push({
      display: '<',
      number: currentPage - 1,
      isDisabled: isItemDisabled(1),
      id: ObjectID().toHexString()
    });
  };

  const addDisplayedPages = (startPage, endPage) => {
    let pageNumber = startPage;
    while (pageNumber <= endPage) {
      paginator.push({
        display: pageNumber,
        number: pageNumber,
        isActive: isPageActive(pageNumber),
        isDisabled: isItemDisabled(pageNumber),
        id: ObjectID().toHexString()
      });
      pageNumber += 1;
    }
  };

  const isFirstPageCurrentPage = () => currentPage === 1;

  const isLastPageCurrentPage = () => currentPage === totalPages;

  const addLastPage = () => {
    paginator.push({
      display: totalPages,
      number: totalPages,
      isDisabled: isItemDisabled(totalPages),
      id: ObjectID().toHexString()
    });
  };

  const addFirstPage = () => {
    paginator.push({
      display: '1',
      number: 1,
      isDisabled: isItemDisabled(1),
      id: ObjectID().toHexString()
    });
  };

  if (totalPages <= 1) {
    return paginator;
  }

  if (totalPages <= PAGES_TO_DISPLAY) {
    addPreviousPage();
    addDisplayedPages(1, totalPages);
    addNextPage();
  } else {
    addFirstPage();
    addPreviousPage();
    if (isFirstPageCurrentPage()) {
      addDisplayedPages(currentPage, PAGES_TO_DISPLAY);
    } else if (isLastPageCurrentPage()) {
      addDisplayedPages(currentPage - 2, totalPages);
    } else {
      addDisplayedPages(currentPage - 1, currentPage + 1);
    }
    addNextPage();
    addLastPage();
  }

  return paginator;
};

export default buildPaginator;

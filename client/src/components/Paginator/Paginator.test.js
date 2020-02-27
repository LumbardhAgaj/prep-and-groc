import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { Switch, Route, Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import Paginator from './Paginator';
import useGetPageItems from 'hooks/useGetPageItems';
import { RECIPES_ROUTE } from 'constants/applicationRoutes';
import { paginatorFetchResonse } from '__fakes__/fetchResponses';
import browserHistory, { getUrlParameters } from 'utils/browserHistory';

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

const PaginatorWrapper = () => {
  useGetPageItems(RECIPES_ROUTE);
  return <Paginator />;
};

const renderPage = () => {
  browserHistory.push('/');
  return {
    ...render(
      <Root>
        <Router history={browserHistory}>
          <Switch>
            <Route path="/" component={PaginatorWrapper} />
          </Switch>
        </Router>
      </Root>
    )
  };
};

describe('Paginator component', () => {
  test('should not render one page when there is one page only', async () => {
    const totalPages = 1;
    const currentPage = 1;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { queryAllByTestId } = renderPage();
    const paginatorItems = queryAllByTestId('pagination-item');
    await wait(() => expect(paginatorItems).toHaveLength(0));
  });

  test('should render second page active when there are two pages and the second page is active', async () => {
    const expectedPaginator = ['<', '1', '2(current)', '>'];
    const totalPages = 2;
    const currentPage = 2;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();

    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render third page as active when there are three pages and the third page is active', async () => {
    const expectedPaginator = ['<', '1', '2', '3(current)', '>'];
    const totalPages = 3;
    const currentPage = 3;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();

    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render five pages and second page as active when there are five pages and the second page is active', async () => {
    const expectedPaginator = ['1', '<', '1', '2(current)', '3', '>', '5'];
    const totalPages = 5;
    const currentPage = 2;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render five pages and third page as active when there are five pages and the third page is active', async () => {
    const expectedPaginator = ['1', '<', '2', '3(current)', '4', '>', '5'];
    const totalPages = 5;
    const currentPage = 3;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render five pages and fourth page as active when there are five pages and the fourth page is active', async () => {
    const expectedPaginator = ['1', '<', '3', '4(current)', '5', '>', '5'];
    const totalPages = 5;
    const currentPage = 4;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render eight pages and fifth page as active when there are eight pages and the fifth page is active', async () => {
    const expectedPaginator = ['1', '<', '4', '5(current)', '6', '>', '8'];
    const totalPages = 8;
    const currentPage = 5;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render eight pages and seventh page as active when there are eight pages and the seventh page is active', async () => {
    const expectedPaginator = ['1', '<', '6', '7(current)', '8', '>', '8'];
    const totalPages = 8;
    const currentPage = 7;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should render eight pages and last page as active when there are eight pages and the eighth page is active', async () => {
    const expectedPaginator = ['1', '<', '6', '7', '8(current)', '>', '8'];
    const totalPages = 8;
    const currentPage = 8;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByTestId } = renderPage();
    await wait(() => {
      const paginatorItems = getAllByTestId('pagination-item');
      paginatorItems.forEach((item, index) => {
        expect(item.textContent).toBe(expectedPaginator[index]);
      });
    });
  });

  test('should return next page number when the user selects next page button from Paginator', async () => {
    const totalPages = 8;
    const currentPage = 6;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getByText } = renderPage();
    await wait(() => {
      const nextPageItem = getByText('>');
      fireEvent.click(nextPageItem);
    });

    const urlParameters = getUrlParameters();
    expect(urlParameters.page).toEqual((currentPage + 1).toString());
  });

  test('should render disabled active,previous page buttons when total pages is less than or equal the number of displayed pages(3) ', async () => {
    const totalPages = 3;
    const currentPage = 1;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getByText } = renderPage();

    await wait(() => {
      const currentPageItem = getByText(currentPage.toString());
      fireEvent.click(currentPageItem);

      const previousPageItem = getByText('<');
      fireEvent.click(previousPageItem);
    });
    const urlParameters = getUrlParameters();
    expect(urlParameters.page).toBeUndefined();
  });

  test('should render disabled active,next page buttons when total pages is greater than the number of displayed pages(3)', async () => {
    const totalPages = 5;
    const currentPage = 5;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByText, getByText } = renderPage();
    await wait(() => {
      const currentPageItems = getAllByText(currentPage.toString());
      fireEvent.click(currentPageItems[0]);

      const nextPageItem = getByText('>');
      fireEvent.click(nextPageItem);
    });
    const urlParameters = getUrlParameters();
    expect(urlParameters.page).toBeUndefined();
  });

  test('should render disabled first, previous page buttons when total pages is greater than the number of displayed pages(3)', async () => {
    const totalPages = 5;
    const currentPage = 1;
    fetchMock.mockImplementationOnce(
      paginatorFetchResonse(totalPages, currentPage)
    );
    const { getAllByText, getByText } = renderPage();

    await wait(() => {
      const currentPageItems = getAllByText(currentPage.toString());
      fireEvent.click(currentPageItems[0]);

      const previousPageItem = getByText('<');
      fireEvent.click(previousPageItem);
    });

    const urlParameters = getUrlParameters();
    expect(urlParameters.page).toBeUndefined();
  });
});

import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import Groceries from './Groceries';
import browserHistory from 'utils/browserHistory';
import { DELETE_GROCERY_ITEM_MESSAGE } from 'constants/userMessages';
import {
  successFetchResponse,
  failFetchResponse,
  emptyItemsFetchResponse
} from '__fakes__/fetchResponses';
import {
  groceryItems,
  groceryItemsFetchResponse
} from '__fakes__/groceryItems';

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

browserHistory.push('/groceries');
const renderPage = () => ({
  ...render(
    <Root>
      <Router history={browserHistory}>
        <Route path="/groceries" component={Groceries} />
      </Router>
      <NotificationToast />
    </Root>
  )
});

describe('Groceries page with items', () => {
  test('should render Groceries page', async () => {
    fetchMock.mockImplementationOnce(groceryItemsFetchResponse);
    const { getByText } = renderPage();

    await wait(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      groceryItems.forEach(item => {
        expect(getByText(item.name)).toBeInTheDocument();
      });
      expect(getByText('Ingredient')).toBeInTheDocument();
      expect(getByText('Amount')).toBeInTheDocument();
      expect(getByText('Completed')).toBeInTheDocument();
    });
  });

  test('should render Groceries page when there are no items', async () => {
    fetchMock.mockImplementationOnce(emptyItemsFetchResponse);
    const { getByText } = renderPage();

    await wait(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(
        getByText('There are no items at the moment.')
      ).toBeInTheDocument();
    });
  });

  test('should delete grocery item from Groceries page', async () => {
    fetchMock
      .mockImplementationOnce(groceryItemsFetchResponse)
      .mockImplementationOnce(successFetchResponse);
    const { getAllByTestId, getByText, queryByText } = renderPage();
    const deletedElementIndex = 0;

    const removeButtons = await waitForElement(() =>
      getAllByTestId('user-action-button')
    );
    fireEvent.click(removeButtons[deletedElementIndex]);

    await wait(() => {
      expect(queryByText(groceryItems[deletedElementIndex].name)).toBeNull();
      expect(getByText(DELETE_GROCERY_ITEM_MESSAGE)).toBeInTheDocument();
    });
  });

  test('should mark item as complete from Groceries page', async () => {
    fetchMock
      .mockImplementationOnce(groceryItemsFetchResponse)
      .mockImplementationOnce(successFetchResponse);
    const { getAllByTestId } = renderPage();
    const markItemCompletedElementIndex = 2;

    let markItemCompletedCheckboxes = await waitForElement(() =>
      getAllByTestId('mark-completed-checkbox')
    );
    fireEvent.click(markItemCompletedCheckboxes[markItemCompletedElementIndex]);

    await wait(() => {
      markItemCompletedCheckboxes = getAllByTestId('mark-completed-checkbox');
      expect(
        markItemCompletedCheckboxes[markItemCompletedElementIndex]
      ).toHaveAttribute('checked');
      expect(
        markItemCompletedCheckboxes[markItemCompletedElementIndex]
      ).toHaveAttribute('disabled');
    });
  });

  test('should fail to delete a grocery item from Groceries page when delete action fails', async () => {
    fetchMock
      .mockImplementationOnce(groceryItemsFetchResponse)
      .mockImplementationOnce(failFetchResponse);
    const { getAllByTestId, getByText, queryByText } = renderPage();
    const deletedElementIndex = 0;

    const deleteButtons = await waitForElement(() =>
      getAllByTestId('user-action-button')
    );
    fireEvent.click(deleteButtons[deletedElementIndex]);

    await wait(() => {
      expect(
        queryByText(groceryItems[deletedElementIndex].name)
      ).toBeInTheDocument();
      expect(
        getByText('An error occured. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  test('should fail to mark item as complete from Groceries page when mark item complete action fails', async () => {
    fetchMock
      .mockImplementationOnce(groceryItemsFetchResponse)
      .mockImplementationOnce(failFetchResponse);
    const { getAllByTestId, getByText } = renderPage();
    const markItemCompletedElementIndex = 1;

    const markItemCompletedCheckboxes = await waitForElement(() =>
      getAllByTestId('mark-completed-checkbox')
    );
    fireEvent.click(markItemCompletedCheckboxes[markItemCompletedElementIndex]);

    await wait(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(
        markItemCompletedCheckboxes[markItemCompletedElementIndex]
      ).not.toHaveAttribute('checked');
      expect(
        markItemCompletedCheckboxes[markItemCompletedElementIndex]
      ).not.toHaveAttribute('disabled');
      expect(
        getByText('An error occured. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});

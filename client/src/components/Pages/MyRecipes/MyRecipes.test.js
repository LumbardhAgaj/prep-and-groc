import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import browserHistory from 'utils/browserHistory';
import Root from 'components/Root/Root';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import MyRecipes from './MyRecipes';
import {
  REMOVE_RECIPE_MESSAGE,
  DELETE_RECIPE_MESSAGE
} from 'constants/userMessages';
import {
  successFetchResponse,
  failFetchResponse,
  emptyItemsFetchResponse
} from '__fakes__/fetchResponses';
import { userSavedRecipes, userRecipesFetchResponse } from '__fakes__/recipes';

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

browserHistory.push('/myrecipes');
const renderPage = () => ({
  ...render(
    <Root>
      <Router history={browserHistory}>
        <Route path="/myrecipes" component={MyRecipes} />
      </Router>
      <NotificationToast />
    </Root>
  )
});

describe('MyRecipes page', () => {
  test('should render MyRecipes page with user recipes collection', async () => {
    fetchMock.mockImplementationOnce(userRecipesFetchResponse);
    const { getByText, getByTestId } = renderPage();
    await wait(() => {
      userSavedRecipes.forEach(recipe => {
        expect(getByText(recipe.title)).toBeInTheDocument();
      });
      expect(getByTestId('delete-icon')).toBeInTheDocument();
      expect(getByTestId('remove-icon')).toBeInTheDocument();
    });
  });

  test('should render MyRecipes page with empty user recipe collection', async () => {
    fetchMock.mockImplementationOnce(emptyItemsFetchResponse);
    const { getByText } = renderPage();
    await wait(() => {
      expect(getByText('There are no items.')).toBeInTheDocument();
    });
  });

  test('should remove recipe from MyRecipes page', async () => {
    fetchMock
      .mockImplementationOnce(userRecipesFetchResponse)
      .mockImplementationOnce(successFetchResponse);
    const { getByText, getByTestId, queryByText } = renderPage();
    const removeButton = await waitForElement(() => getByTestId('remove-icon'));
    fireEvent.click(removeButton);

    await wait(() => {
      expect(queryByText(userSavedRecipes[1].title)).toBeNull();
      expect(getByText(REMOVE_RECIPE_MESSAGE)).toBeInTheDocument();
    });
  });

  test('should delete recipe from MyRecipes page', async () => {
    fetchMock
      .mockImplementationOnce(userRecipesFetchResponse)
      .mockImplementationOnce(successFetchResponse);
    const { getByText, getByTestId, queryByText } = renderPage();
    const deleteButton = await waitForElement(() => getByTestId('delete-icon'));
    fireEvent.click(deleteButton);

    await wait(() => {
      expect(queryByText(userSavedRecipes[0].title)).toBeNull();
      expect(getByText(DELETE_RECIPE_MESSAGE)).toBeInTheDocument();
    });
  });

  test('should fail to delete recipe from MyRecipes page when delete recipe action fails', async () => {
    fetchMock
      .mockImplementationOnce(userRecipesFetchResponse)
      .mockImplementationOnce(failFetchResponse);

    const { getByText, getByTestId } = renderPage();
    const deleteButton = await waitForElement(() => getByTestId('delete-icon'));
    fireEvent.click(deleteButton);

    await wait(() => {
      expect(getByText(userSavedRecipes[0].title)).toBeInTheDocument();
      expect(
        getByText('An error occured. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  test('should fail to remove recipe from MyRecipes page when remove recipe action fails', async () => {
    fetchMock
      .mockImplementationOnce(userRecipesFetchResponse)
      .mockImplementationOnce(failFetchResponse);
    const { getByText, getByTestId } = renderPage();
    const removeButton = await waitForElement(() => getByTestId('remove-icon'));
    fireEvent.click(removeButton);

    await wait(() => {
      expect(getByText(userSavedRecipes[1].title)).toBeInTheDocument();
      expect(
        getByText('An error occured. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});

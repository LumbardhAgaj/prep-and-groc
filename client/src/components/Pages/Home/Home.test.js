import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import Root from 'components/Root/Root';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import LoginModal from 'components/LoginModal/LoginModal';
import Home from './Home';
import {
  ADD_RECIPE_MESSAGE,
  UNKNOWN_ERROR_MESSAGE
} from 'constants/userMessages';
import browserHistory from 'utils/browserHistory';
import {
  successFetchResponse,
  failFetchResponse,
  emptyItemsFetchResponse
} from '__fakes__/fetchResponses';
import { unauthorizedFetchResponse } from '__fakes__/users';
import { ingredientsFetchResponse } from '__fakes__/ingredients';
import { recipes, recipesFetchResponse } from '__fakes__/recipes';

const fetchMock = jest.spyOn(global, 'fetch');

browserHistory.push('/groceries');
const renderPage = () => ({
  ...render(
    <Root>
      wq
      <NotificationToast />
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
      </Router>
      <LoginModal />
    </Root>
  )
});

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

describe('Home page without recipes', () => {
  test('should render Home page with empty recipes', async () => {
    fetchMock
      .mockImplementationOnce(ingredientsFetchResponse)
      .mockImplementationOnce(emptyItemsFetchResponse);
    const { getByText } = renderPage();
    await wait(() => {
      expect(getByText('There are no items.')).toBeInTheDocument();
    });
  });

  test('should render Home page when recipes fetch action fails', async () => {
    fetchMock
      .mockImplementationOnce(ingredientsFetchResponse)
      .mockImplementationOnce(failFetchResponse);
    const { getByText } = renderPage();
    await wait(() => {
      expect(
        getByText('An error occured. We could not get the items at this time.')
      ).toBeInTheDocument();
    });
  });
});

describe('Home page with recipes', () => {
  beforeEach(() => {
    fetchMock
      .mockImplementationOnce(ingredientsFetchResponse)
      .mockImplementationOnce(recipesFetchResponse);
  });

  describe('Home page with unauthenticated user', () => {
    test('should render Home page when user is not authenticated', async () => {
      const { getByText, getAllByTestId } = renderPage();

      await wait(() => {
        const numberOfUnsavedRecipes = 6;
        expect(getAllByTestId('add-icon')).toHaveLength(numberOfUnsavedRecipes);
        recipes.forEach(recipe => {
          expect(getByText(recipe.title)).toBeInTheDocument();
        });
      });
    });

    test('should display LoginDialog when user adds a recipe to collection', async () => {
      fetchMock.mockImplementationOnce(unauthorizedFetchResponse);
      const {
        getByText,
        getAllByText,
        getAllByTestId,
        getByTestId
      } = renderPage();
      const addRecipeButtons = await waitForElement(() =>
        getAllByTestId('add-icon')
      );
      fireEvent.click(addRecipeButtons[0]);

      await wait(() => {
        expect(getByTestId('login-modal')).toBeInTheDocument();
        expect(getAllByText('Login')).toHaveLength(2);
        expect(getByText('Signup')).toBeInTheDocument();
      });
    });
  });

  describe('Home page with authenticated user', () => {
    test('should add a recipe to user recipes collection', async () => {
      fetchMock.mockImplementationOnce(successFetchResponse);
      const { getByText, getAllByTestId } = renderPage();
      const notAddedRecipeIndex = 1;
      const totalNumberofNotAddedRecipes = 6;
      let addRecipeButtons = await waitForElement(() =>
        getAllByTestId('add-icon')
      );
      fireEvent.click(addRecipeButtons[notAddedRecipeIndex]);

      await wait(() => {
        addRecipeButtons = getAllByTestId('add-icon');
        expect(addRecipeButtons.length).toEqual(
          totalNumberofNotAddedRecipes - 1
        );
        expect(getByText(ADD_RECIPE_MESSAGE)).toBeInTheDocument();
      });
    });

    test('should remove a recipe from user recipes collection', async () => {
      fetchMock.mockImplementationOnce(successFetchResponse);
      const { getAllByTestId } = renderPage();
      const addedRecipeIndex = 0;
      const totalNumberOfSavedRecipes = 3;
      let removeRecipeButtons = await waitForElement(() =>
        getAllByTestId('remove-icon')
      );
      fireEvent.click(removeRecipeButtons[addedRecipeIndex]);

      await wait(() => {
        removeRecipeButtons = getAllByTestId('remove-icon');
        expect(removeRecipeButtons.length).toEqual(
          totalNumberOfSavedRecipes - 1
        );
      });
    });

    test('should fail to add a recipe to user recipes collection when add recipe action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getAllByTestId, queryByText, getByText } = renderPage();
      const notAddedRecipeIndex = 1;
      const addRecipeButtons = await waitForElement(() =>
        getAllByTestId('add-icon')
      );
      fireEvent.click(addRecipeButtons[notAddedRecipeIndex]);

      await wait(() => {
        expect(queryByText('Recipe was added to your collection.')).toBeNull();
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument();
      });
    });

    test('should fail to remove a recipe from user recipes collection when remove recipe action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getAllByTestId, getByText } = renderPage();
      const addedRecipeIndex = 0;
      const removeRecipeButtons = await waitForElement(() =>
        getAllByTestId('remove-icon')
      );
      fireEvent.click(removeRecipeButtons[addedRecipeIndex]);

      await wait(() => {
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument();
      });
    });
  });
});

import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import ObjectID from 'bson-objectid';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import Recipe from './Recipe';
import {
  addedRecipe,
  unaddedRecipe,
  ownedRecipe,
  addedRecipeFetchResponse,
  unaddedRecipeFetchResponse,
  ownedRecipeFetchResponse
} from '__fakes__/recipes';

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

const renderPage = recipeId => ({
  ...render(
    <Root>
      <Router>
        <Recipe match={{ params: { id: recipeId } }} />
      </Router>
    </Root>
  )
});

describe('Recipe page', () => {
  test('should render Recipe page', async () => {
    fetchMock.mockImplementationOnce(unaddedRecipeFetchResponse);
    const { getByText } = renderPage(unaddedRecipe._id);

    await wait(() => {
      expect(getByText(unaddedRecipe.title)).toBeInTheDocument();
      expect(getByText(unaddedRecipe.category)).toBeInTheDocument();
    });

    const instructionsTabButton = getByText('Ingredients');
    fireEvent.click(instructionsTabButton);
    unaddedRecipe.ingredients.forEach(ingredient => {
      expect(getByText(ingredient.name)).toBeInTheDocument();
    });
  });

  test('should render NotFound page when recipe does not exist', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: true,
            name: 'ObjectNotFoundError',
            message: 'No recipe was found'
          }),
        status: 400
      })
    );
    const notFoundRecipeId = ObjectID();
    const { getByText } = renderPage(notFoundRecipeId);
    await wait(() => {
      expect(getByText('Page not found 404')).toBeInTheDocument();
    });
  });

  test('should render add recipe button when recipe is not found in collection', async () => {
    fetchMock.mockImplementationOnce(unaddedRecipeFetchResponse);
    const { getByText, queryByText } = renderPage(unaddedRecipe._id);
    await wait(() => {
      expect(getByText('Add')).toBeInTheDocument();
      expect(queryByText('Delete')).toBeNull();
      expect(queryByText('Remove')).toBeNull();
    });
  });

  test('should render delete recipe button when user is the owner of the recipe', async () => {
    fetchMock.mockImplementationOnce(ownedRecipeFetchResponse);
    const { getByText, queryByText } = renderPage(ownedRecipe._id);
    await wait(() => {
      expect(getByText('Delete')).toBeInTheDocument();
      expect(queryByText('Add')).toBeNull();
      expect(queryByText('Remove')).toBeNull();
    });
  });

  test('should render remove recipe button when recipe is found in collection', async () => {
    fetchMock.mockImplementationOnce(addedRecipeFetchResponse);
    const { getByText, queryByText } = renderPage(addedRecipe._id);
    await wait(() => {
      expect(getByText('Remove')).toBeInTheDocument();
      expect(queryByText('Add')).toBeNull();
      expect(queryByText('Delete')).toBeNull();
    });
  });
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import CardRecipeWithDeleteOrRemoveBtn from './CardRecipeWithDeleteOrRemoveButton';
import { userSavedRecipes } from '__fakes__/recipes';

const renderComponent = cardRecipe => ({
  ...render(
    <Root>
      <Router>
        <CardRecipeWithDeleteOrRemoveBtn cardRecipe={cardRecipe} />
      </Router>
    </Root>
  )
});

afterEach(() => {
  cleanup();
});

describe('CardRecipeWithDeleteOrRemoveBtn component', () => {
  test('should render CardRecipeWithDeleteOrRemoveBtn', () => {
    const { getByText, queryByText, queryByTestId } = renderComponent(
      userSavedRecipes[0]
    );
    const cardRecipeTitle = getByText(userSavedRecipes[0].title);
    const cardRecipeCategory = queryByText(userSavedRecipes[0].category, {
      exact: false
    });
    const cardRecipePrepareBtn = queryByTestId('prepare-recipe-icon');

    expect(cardRecipeTitle.textContent).toBe(userSavedRecipes[0].title);
    expect(cardRecipeCategory).not.toBeNull();
    expect(cardRecipePrepareBtn).not.toBeNull();
  });

  test('should render remove button when user is not recipe owner', () => {
    const { queryByTestId } = renderComponent(userSavedRecipes[1]);
    const removeButton = queryByTestId('remove-icon');

    expect(removeButton).not.toBeNull();
  });

  test('should render delete button when user is recipe owner', () => {
    const { queryByTestId } = renderComponent(userSavedRecipes[0]);
    const deleteButton = queryByTestId('delete-icon');

    expect(deleteButton).not.toBeNull();
  });
});

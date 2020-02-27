import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import CardRecipeWithAddOrRemoveButton from './CardRecipeWithAddOrRemoveButton';

const userAddedRecipe = {
  _id: '5c9b4b55de617741405b5a96',
  title: 'Mustard Pie',
  category: 'Beef',
  area: 'British',
  owner: 'LA',
  imageUrl: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
  isSaved: true
};

const userNotAddedRecipe = {
  _id: '5c9b4b55de617741405b5ab6',
  title: 'Chicken Bourguignon',
  category: 'Chicken',
  area: 'American',
  owner: 'LA',
  imageUrl: 'https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg',
  isSaved: false
};

const renderComponent = cardRecipe => ({
  ...render(
    <Root>
      <Router>
        <CardRecipeWithAddOrRemoveButton cardRecipe={cardRecipe} />
      </Router>
    </Root>
  )
});

afterEach(() => {
  cleanup();
});

describe('CardRecipeWithAddOrRemoveButton component', () => {
  test('should render save/remove button', () => {
    const { getByText, queryByText } = renderComponent(userAddedRecipe);
    const cardRecipeTitle = getByText(userAddedRecipe.title);
    const cardRecipeCategory = queryByText(userAddedRecipe.category, {
      exact: false
    });
    expect(cardRecipeTitle.textContent).toBe(userAddedRecipe.title);
    expect(cardRecipeCategory).not.toBeNull();
  });

  test('should render remove button when recipe is added', () => {
    const { queryByTestId } = renderComponent(userAddedRecipe);
    const removeButton = queryByTestId('remove-icon');
    expect(removeButton).not.toBeNull();
  });

  test('should render add button when recipe is not added', () => {
    const { queryByTestId } = renderComponent(userNotAddedRecipe);
    const saveButton = queryByTestId('add-icon');
    expect(saveButton).not.toBeNull();
  });
});

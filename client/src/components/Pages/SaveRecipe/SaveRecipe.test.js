import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { Redirect, Switch, Route, Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import SaveRecipe from './SaveRecipe';
import MyRecipes from 'components/Pages/MyRecipes/MyRecipes';
import { SAVE_RECIPE_MESSAGE } from 'constants/userMessages';
import browserHistory from 'utils/browserHistory';
import { recipe, userRecipesFetchResponse } from '__fakes__/recipes';
import { ingredientsFetchResponse } from '__fakes__/ingredients';
import { successFetchResponse } from '__fakes__/fetchResponses';

const FORM_UNIT_INIT_VALUE = 'gr';

const fetchMock = jest.spyOn(global, 'fetch');

const renderPage = () => ({
  ...render(
    <Root>
      <SaveRecipe />
    </Root>
  )
});

const renderPageWithRouter = (initRoute = '/saverecipe') => {
  browserHistory.push(initRoute);
  return {
    ...render(
      <Root>
        <NotificationToast />
        <Router history={browserHistory}>
          <Switch>
            <Route path="/myrecipes" component={MyRecipes} />
            <Route path="/saverecipe" component={SaveRecipe} />
            <Redirect from="/" to="/home" exact />
          </Switch>
        </Router>
      </Root>
    )
  };
};

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

describe('SaveRecipe page', () => {
  test('should render SaveRecipe page', () => {
    fetchMock.mockImplementationOnce(ingredientsFetchResponse);
    const { getByText, queryByText } = renderPage();
    expect(getByText('Recipe')).toBeInTheDocument();
    expect(queryByText('Ingredients')).toBeInTheDocument();
    expect(queryByText('Previous')).toBeNull();
    expect(getByText('Save and Continue')).toBeInTheDocument();
  });

  describe('SaveRecipe page with recipe information', () => {
    let component;
    beforeEach(() => {
      fetchMock.mockImplementationOnce(ingredientsFetchResponse);
      component = renderPageWithRouter();
      const { getByText, getByLabelText } = component;
      const recipeTitleTextInput = getByLabelText('Title');
      fireEvent.change(recipeTitleTextInput, {
        target: { value: recipe.title }
      });

      const recipeCategorySelectInput = getByLabelText('Category');
      fireEvent.change(recipeCategorySelectInput, {
        target: { value: recipe.category }
      });

      const recipeCountrySelectInput = getByLabelText('Country origin');
      fireEvent.change(recipeCountrySelectInput, {
        target: { value: recipe.country }
      });

      const recipeInstructionsTextareaInput = getByLabelText('Instructions');
      fireEvent.change(recipeInstructionsTextareaInput, {
        target: { value: recipe.instructions }
      });

      const imageUrlUrlTextareaInput = getByLabelText('Recipe Image URL');
      fireEvent.change(imageUrlUrlTextareaInput, {
        target: { value: recipe.imageUrl }
      });

      const saveButton = getByText('Save and Continue');
      fireEvent.click(saveButton);
    });

    test('should render SaveRecipe with ingredients form', async () => {
      const { getByText, getByLabelText, getByDisplayValue } = component;
      await wait(() => expect(getByText('Previous')).toBeInTheDocument());
      expect(getByText('Submit')).toBeInTheDocument();
      expect(getByLabelText('Ingredient name')).toBeInTheDocument();
      expect(getByDisplayValue(FORM_UNIT_INIT_VALUE)).toBeInTheDocument();
      expect(getByLabelText('Amount')).toBeInTheDocument();
    });

    test('should render recipe form with data when user returns from ingredient form using previous button', async () => {
      const { getByText, getByTestId } = component;

      const previousButton = await waitForElement(() => getByText('Previous'));
      fireEvent.click(previousButton);

      await wait(() => {
        expect(getByTestId('save-recipe-form')).toHaveFormValues({
          title: recipe.title,
          category: recipe.category,
          area: recipe.area,
          imageUrl: recipe.imageUrl
        });
      });
    });

    test('should save the recipe and redirect the user to MyRecipes page', async () => {
      fetchMock
        .mockImplementationOnce(successFetchResponse)
        .mockImplementationOnce(userRecipesFetchResponse);
      const { getByText, getByLabelText, getByDisplayValue } = component;

      const ingredientNameTextInput = await waitForElement(() =>
        getByLabelText('Ingredient name')
      );
      fireEvent.change(ingredientNameTextInput, {
        target: { value: recipe.ingredients[0].name }
      });

      const ingredientAmountTextInput = getByLabelText('Amount');
      fireEvent.change(ingredientAmountTextInput, {
        target: { value: recipe.ingredients[0].amount }
      });

      const ingredientUnitSelectInput = getByDisplayValue(FORM_UNIT_INIT_VALUE);
      fireEvent.change(ingredientUnitSelectInput, {
        target: { value: recipe.ingredients[0].unit }
      });

      const ingredientMetaInput = getByLabelText('Meta');
      fireEvent.change(ingredientMetaInput, {
        target: { value: recipe.ingredients[0].meta }
      });

      const saveButton = getByText('Save');
      fireEvent.click(saveButton);

      await wait(() => {
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
      });

      await wait(() =>
        expect(getByText(SAVE_RECIPE_MESSAGE)).toBeInTheDocument()
      );
    });
  });
});

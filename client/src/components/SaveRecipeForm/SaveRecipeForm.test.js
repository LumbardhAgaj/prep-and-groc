import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import SaveRecipeForm from './SaveRecipeForm';
import CATEGORIES from 'data/recipeCategoryOptionValues.json';
import COUNTRIES from 'data/recipeCountryOptionValues.json';
import submitFormMock from '__mocks__/submitForm';
import { recipe } from '__fakes__/recipes';

const initialSaveRecipeFormValues = {
  title: '',
  category: '',
  area: '',
  instructions: '',
  imageUrl: ''
};

const renderComponent = () => ({
  ...render(
    <SaveRecipeForm
      onSubmit={submitFormMock}
      initialValues={initialSaveRecipeFormValues}
    />
  )
});

afterEach(() => {
  cleanup();
  submitFormMock.mockClear();
});

describe('SaveRecipeForm component', () => {
  test('should render SaveRecipeForm', async () => {
    const { queryByLabelText } = renderComponent();
    expect(queryByLabelText('Title')).toBeInTheDocument();
    expect(queryByLabelText('Category')).toBeInTheDocument();
    expect(queryByLabelText('Country origin')).toBeInTheDocument();
    expect(queryByLabelText('Instructions')).toBeInTheDocument();
    expect(queryByLabelText('Recipe Image URL')).toBeInTheDocument();
  });

  test('should render SaveRecipeForm with category and country options', async () => {
    const { getByText } = renderComponent();

    CATEGORIES.forEach(category => {
      expect(getByText(category.label)).toBeInTheDocument();
    });

    COUNTRIES.forEach(country => {
      expect(getByText(country.label)).toBeInTheDocument();
    });
  });

  test('should render validation errors when user submits empty form', async () => {
    const { getByText } = renderComponent();

    const saveButton = getByText('Save and Continue');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(0);
      expect(getByText('title is required')).toBeInTheDocument();
      expect(getByText('category is required')).toBeInTheDocument();
      expect(getByText('origin is required')).toBeInTheDocument();
      expect(getByText('instructions are required')).toBeInTheDocument();
      expect(getByText('image URL is required')).toBeInTheDocument();
    });
  });

  test('should render validation errors when user submits form with title characters longer than 30', async () => {
    const invalidRecipeTitle =
      'Smoked salmon with garlic powder and sesame sauce carefully sprayed, sliced in qarter of pounds';

    const { getByLabelText, getByText } = renderComponent();

    const recipeTitleTextInput = getByLabelText('Title');
    fireEvent.change(recipeTitleTextInput, {
      target: { value: invalidRecipeTitle }
    });

    const saveButton = getByText('Save and Continue');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(0);
      expect(
        getByText('title must be at most 30 characters')
      ).toBeInTheDocument();
    });
  });

  test('should render validation errors when user submits form with invalid image url', async () => {
    const invalidRecipeImageUrl = 'http:/www.staticflickr.com/kmsf/';
    const { getByLabelText, getByText } = renderComponent();

    const imageUrlUrlTextInput = getByLabelText('Recipe Image URL');
    fireEvent.change(imageUrlUrlTextInput, {
      target: { value: invalidRecipeImageUrl }
    });

    const saveButton = getByText('Save and Continue');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(0);
      expect(
        getByText('recipe image must be a valid URL format')
      ).toBeInTheDocument();
    });
  });

  test('should save recipe', async () => {
    const { getByLabelText, getByText } = renderComponent();

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

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(1);
      expect(submitFormMock.mock.calls[0].length).toEqual(2);
    });
  });
});

import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import Root from 'components/Root/Root';
import SaveIngredientForm from './SaveIngredientForm';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import { ingredientsFetchResponse } from '__fakes__/ingredients';
import { fridgeIngredient } from '__fakes__/fridgeIngredients';
import submitFormMock from '__mocks__/submitForm';
import UNITS from 'data/ingredientUnitOptionValues.json';

const FORM_UNIT_INIT_VALUE = 'gr';

const fetchMock = jest.spyOn(global, 'fetch');

const renderComponent = () => ({
  ...render(
    <Root>
      <NotificationToast />
      <SaveIngredientForm onSaveIngredient={submitFormMock} />
    </Root>
  )
});

beforeEach(() => {
  fetchMock.mockImplementationOnce(ingredientsFetchResponse);
});

afterEach(() => {
  cleanup();
  fetchMock.mockClear();
  submitFormMock.mockClear();
});

describe('SaveIngredientForm component', () => {
  test('should render SaveIngredientForm', async () => {
    const { queryByLabelText, queryByDisplayValue } = renderComponent();
    await wait(() => {
      expect(queryByLabelText('Ingredient name')).toBeInTheDocument();
      expect(queryByLabelText('Amount')).toBeInTheDocument();
      expect(queryByDisplayValue(FORM_UNIT_INIT_VALUE)).toBeInTheDocument();
      expect(queryByLabelText('Meta')).toBeInTheDocument();
    });
  });

  test('should render SaveIngredientForm with unit items', async () => {
    const { getByText } = renderComponent();
    await wait(() => {
      for (let i = 0; i < UNITS.length; i += 1) {
        expect(getByText(UNITS[i].label)).toBeInTheDocument();
      }
    });
  });

  test('should render validation errors when user submits empty form', async () => {
    const { getByText } = renderComponent();
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(0);
      expect(getByText('name is required')).toBeInTheDocument();
      expect(getByText('amount is required')).toBeInTheDocument();
    });
  });

  test('should render validation error when user submits form with non-alphabetical ingredient name', async () => {
    const invalidIngredientName = 1233;
    const { getByLabelText, getByText } = renderComponent();

    const ingredientNameTextInput = getByLabelText('Ingredient name');
    fireEvent.change(ingredientNameTextInput, {
      target: { value: invalidIngredientName }
    });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(0);
      expect(
        getByText('ingredient name must contain letters only')
      ).toBeInTheDocument();
      expect(getByText('amount is required')).toBeInTheDocument();
    });
  });

  test('should render validation error when user submits form with non-numerical ingredient amount', async () => {
    let invalidAmount = 'absd';

    const { getByLabelText, getByText } = renderComponent();
    const ingredientAmountTextInput = getByLabelText('Amount');
    fireEvent.change(ingredientAmountTextInput, {
      target: { value: invalidAmount }
    });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(getByText('amount must be a number')).toBeInTheDocument();
      expect(submitFormMock).toHaveBeenCalledTimes(0);
    });

    invalidAmount = -2344;
    fireEvent.change(ingredientAmountTextInput, {
      target: { value: invalidAmount }
    });
    fireEvent.click(saveButton);

    await wait(() => {
      expect(getByText('amount must be a positive number')).toBeInTheDocument();
      expect(getByText('name is required')).toBeInTheDocument();
    });
  });

  test('should save ingredient', async () => {
    const { getByLabelText, getByText, getByDisplayValue } = renderComponent();
    const ingredientNameTextInput = getByLabelText('Ingredient name');
    fireEvent.change(ingredientNameTextInput, {
      target: { value: fridgeIngredient.name }
    });

    const ingredientAmountTextInput = getByLabelText('Amount');
    fireEvent.change(ingredientAmountTextInput, {
      target: { value: fridgeIngredient.amount }
    });

    const ingredientUnitSelectInput = getByDisplayValue(FORM_UNIT_INIT_VALUE);
    fireEvent.change(ingredientUnitSelectInput, {
      target: { value: fridgeIngredient.unit }
    });

    const ingredientMetaInput = getByLabelText('Meta');
    fireEvent.change(ingredientMetaInput, {
      target: { value: fridgeIngredient.meta }
    });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    await wait(() => {
      expect(submitFormMock).toHaveBeenCalledTimes(1);
      expect(submitFormMock.mock.calls[0][0]).toEqual(fridgeIngredient);
      expect(submitFormMock.mock.calls[0].length).toEqual(2);
    });
  });
});

import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import Root from 'components/Root/Root';
import Fridge from './Fridge';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import {
  SAVE_FRIDGE_INGREDIENT_MESSAGE,
  DELETE_FRIDGE_INGREDIENT_MESSAGE,
  UNKNOWN_ERROR_MESSAGE
} from 'constants/userMessages';
import {
  successFetchResponse,
  failFetchResponse
} from '__fakes__/fetchResponses';
import {
  fridgeIngredient,
  fridgeIngredients,
  fridgeIngredientsFetchResponse,
  saveFridgeIngredientFetchResponse
} from '__fakes__/fridgeIngredients';
import { ingredientsFetchResponse } from '__fakes__/ingredients';

const INITIAL_UNIT_VALUE = 'gr';

const fetchMock = jest.spyOn(global, 'fetch');

beforeEach(() => {
  fetchMock
    .mockImplementationOnce(ingredientsFetchResponse)
    .mockImplementationOnce(fridgeIngredientsFetchResponse);
});

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

const renderPage = () => ({
  ...render(
    <Root>
      <Fridge />
      <NotificationToast />
    </Root>
  )
});

describe('Fridge page with ingredients', () => {
  test('should render Fridge page', async () => {
    const { getByText, getAllByText } = renderPage();

    await wait(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
      fridgeIngredients.forEach(item => {
        expect(getByText(item.name)).toBeInTheDocument();
      });
      expect(getByText('Ingredient')).toBeInTheDocument();
      expect(getAllByText('Amount')).toHaveLength(2);
    });
  });

  test('should delete ingredient from Fridge page', async () => {
    fetchMock.mockImplementationOnce(successFetchResponse);
    const { getAllByTestId, getByText, queryByText } = renderPage();
    const deletedElementIndex = 1;

    const deleteButtons = await waitForElement(() =>
      getAllByTestId('user-action-button')
    );
    fireEvent.click(deleteButtons[deletedElementIndex]);

    await wait(() => {
      expect(
        queryByText(fridgeIngredients[deletedElementIndex].name)
      ).toBeNull();
      expect(getByText(DELETE_FRIDGE_INGREDIENT_MESSAGE)).toBeInTheDocument();
    });
  });

  describe('Saving fridge ingredient', () => {
    let component;
    beforeEach(() => {
      component = renderPage();
      const { getByLabelText, getByDisplayValue, getByText } = component;
      const ingredientNameTextInput = getByLabelText('Ingredient name');
      fireEvent.change(ingredientNameTextInput, {
        target: { value: fridgeIngredient.name }
      });

      const ingredientAmountTextInput = getByLabelText('Amount');
      fireEvent.change(ingredientAmountTextInput, {
        target: { value: fridgeIngredient.amount }
      });

      const ingredientUnitSelectInput = getByDisplayValue(INITIAL_UNIT_VALUE);
      fireEvent.change(ingredientUnitSelectInput, {
        target: { value: fridgeIngredient.unit }
      });

      const ingredientMetaInput = getByLabelText('Meta');
      fireEvent.change(ingredientMetaInput, {
        target: { value: fridgeIngredient.meta }
      });

      const saveButton = getByText('Save');
      fireEvent.click(saveButton);
    });

    test('should save fridge ingredient', async () => {
      fetchMock.mockImplementationOnce(saveFridgeIngredientFetchResponse);
      const { getByText } = component;

      await wait(() => {
        expect(getByText(fridgeIngredient.name)).toBeInTheDocument();
        expect(getByText(SAVE_FRIDGE_INGREDIENT_MESSAGE)).toBeInTheDocument();
      });
    });

    test('should fail to save fridge ingredient when save fridge ingredient action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getByText } = component;

      await wait(() =>
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument()
      );
    });
  });
});

import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import Root from 'components/Root/Root';
import PrepareRecipeButton from 'components/Buttons/PrepareRecipeButton';
import PrepareRecipeModal from './PrepareRecipeModal';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import {
  UNKNOWN_ERROR_MESSAGE,
  SAVE_GROCERY_ITEMS_MESSAGE
} from 'constants/userMessages';
import {
  successFetchResponse,
  failFetchResponse,
  emptyItemsFetchResponse
} from '__fakes__/fetchResponses';
import { prepareRecipeFetchResponse, prepareRecipeId } from '__fakes__/recipes';
import useIsModalShown from 'hooks/useIsModalShown';
import { PREPARE_RECIPE_MODAL } from 'constants/modalNames';

const fetchMock = jest.spyOn(global, 'fetch');

const ModalWrapper = () => {
  const isModalShown = useIsModalShown(PREPARE_RECIPE_MODAL);
  return <>({isModalShown ? <PrepareRecipeModal /> : null}) </>;
};

const renderPage = () => ({
  ...render(
    <Root>
      <NotificationToast />
      <ModalWrapper />
      <PrepareRecipeButton id={prepareRecipeId}>Prepare</PrepareRecipeButton>
    </Root>
  )
});

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

describe('PrepareRecipeModal component', () => {
  test('should not render PrepareRecipeModal by default', () => {
    const { queryByTestId } = renderPage();
    expect(queryByTestId('prepare-recipe-modal')).toBeNull();
  });

  test('should render disabled save to groceries button when user prepares the recipe with no missing ingredients', async () => {
    fetchMock.mockImplementationOnce(emptyItemsFetchResponse);
    const { getByText } = renderPage();
    const prepareRecipeButton = getByText('Prepare');
    fireEvent.click(prepareRecipeButton);

    await wait(() => {
      const saveToGroceryButton = getByText('Save to groceries');
      fireEvent.click(saveToGroceryButton);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(saveToGroceryButton).toBeDisabled();
    });
  });

  test('should render PrepareRecipeModal when prepare recipe action fails', async () => {
    fetchMock.mockImplementationOnce(failFetchResponse);
    const { getByText } = renderPage();
    const prepareRecipeButton = getByText('Prepare');
    fireEvent.click(prepareRecipeButton);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    await wait(() =>
      expect(
        getByText('An error occured. We could not get the items at this time.')
      ).toBeInTheDocument()
    );
  });

  describe('Preparing recipe', () => {
    let component;
    beforeEach(() => {
      fetchMock.mockImplementationOnce(prepareRecipeFetchResponse);
      component = renderPage();
      const { getByText } = component;
      const prepareRecipeButton = getByText('Prepare');
      fireEvent.click(prepareRecipeButton);
    });

    test('should hide PrepareRecipeModal', async () => {
      const { getAllByText, queryByTestId } = component;
      let closeButtons = getAllByText('Close');
      fireEvent.click(closeButtons[0]);
      await wait(() =>
        expect(queryByTestId('prepare-recipe-modal')).toBeNull()
      );
    });

    test('should display NotificationToast error message when save items to groceries list action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getByText, queryByTestId } = component;
      await wait(() => {
        const saveToGroceryButton = getByText('Save to groceries');
        fireEvent.click(saveToGroceryButton);
      });
      await wait(() => {
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(queryByTestId('prepare-recipe-modal')).toBeNull();
      });
    });

    test('should display NotificationToast success message when user saves items to groceries list', async () => {
      fetchMock.mockImplementationOnce(successFetchResponse);
      const { getByText, queryByTestId } = renderPage();

      await wait(() => {
        const saveToGroceryButton = getByText('Save to groceries');
        fireEvent.click(saveToGroceryButton);
      });

      await wait(() => {
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(queryByTestId('prepare-recipe-modal')).toBeNull();
        expect(getByText(SAVE_GROCERY_ITEMS_MESSAGE)).toBeInTheDocument();
      });
    });
  });
});

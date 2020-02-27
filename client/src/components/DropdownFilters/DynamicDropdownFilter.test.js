import React, { useReducer } from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import Root from 'components/Root/Root';
import DynamicDropdownFilter from './DynamicDropdownFilter';
import pageReducer, { PAGE_INIT_STATE } from 'reducers/page';
import { INGREDIENTS_ROUTE } from 'constants/applicationRoutes';
import { ingredientsFetchResponse, ingredients } from '__fakes__/ingredients';

const DynamicFilterMockComponentWrapper = () => {
  const [, pageDispatcher] = useReducer(pageReducer, PAGE_INIT_STATE);
  return (
    <Root>
      <DynamicDropdownFilter
        url={INGREDIENTS_ROUTE}
        name="Country"
        dispatch={pageDispatcher}
      />
    </Root>
  );
};

const fetchMock = jest.spyOn(global, 'fetch');

fetchMock.mockImplementation(ingredientsFetchResponse);

afterEach(() => {
  cleanup();
  fetchMock.mockClear();
});

describe('DynamicDropdownFilter component', () => {
  test('should render DynamicDropdownFilter', async () => {
    const filterName = 'Country';
    const { getAllByText } = render(<DynamicFilterMockComponentWrapper />);

    await wait(() =>
      expect(getAllByText(filterName).length).toBe(ingredients.length)
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
